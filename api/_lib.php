<?php
// Shared helpers for the form handlers. Not reachable directly (see .htaccess).

const SITE_EMAIL = 'inquiries@thetale.haus';   // where notifications go
const FROM_EMAIL = 'website@thetale.haus';     // sender address (must be on this domain)
const DATA_DIR   = __DIR__ . '/../private';    // CSV files live here, blocked from the web

function respond(int $code, string $message): void {
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['ok' => $code < 300, 'message' => $message]);
    exit;
}

function require_post(): void {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') respond(405, 'Use POST.');
    // Honeypot: real visitors never fill the hidden "website" field.
    if (!empty($_POST['website'])) respond(200, 'Thanks!');
}

function field(string $name, int $max = 200): string {
    $v = trim((string)($_POST[$name] ?? ''));
    $v = str_replace(["\r", "\0"], '', $v);
    return mb_substr($v, 0, $max);
}

// Simple per-IP rate limit: at most $limit submissions per hour.
function rate_limit(string $bucket, int $limit = 5): void {
    if (!is_dir(DATA_DIR)) mkdir(DATA_DIR, 0750, true);
    $file = DATA_DIR . "/ratelimit-$bucket.json";
    $ip = hash('sha256', $_SERVER['REMOTE_ADDR'] ?? '');
    $now = time();
    $data = is_file($file) ? (json_decode((string)file_get_contents($file), true) ?: []) : [];
    $hits = array_values(array_filter($data[$ip] ?? [], fn($t) => $t > $now - 3600));
    if (count($hits) >= $limit) respond(429, 'Too many submissions. Please try again later.');
    $hits[] = $now;
    $data[$ip] = $hits;
    file_put_contents($file, json_encode($data), LOCK_EX);
}

function save_row(string $file, array $row): void {
    if (!is_dir(DATA_DIR)) mkdir(DATA_DIR, 0750, true);
    $path = DATA_DIR . "/$file";
    $new = !is_file($path);
    $fh = fopen($path, 'a');
    if (!$fh) return;
    flock($fh, LOCK_EX);
    if ($new) fputcsv($fh, array_keys($row));
    // Stop spreadsheet formula injection when the CSV is opened in Excel/Sheets.
    fputcsv($fh, array_map(fn($v) => preg_match('/^[=+\-@]/', (string)$v) ? "'" . $v : $v, $row));
    flock($fh, LOCK_UN);
    fclose($fh);
}

function notify(string $subject, string $body, string $replyTo = ''): bool {
    $headers = [
        'From: The Tale Haus Website <' . FROM_EMAIL . '>',
        'Content-Type: text/plain; charset=utf-8',
    ];
    if ($replyTo && filter_var($replyTo, FILTER_VALIDATE_EMAIL)) $headers[] = "Reply-To: $replyTo";
    return mail(SITE_EMAIL, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, implode("\r\n", $headers));
}
