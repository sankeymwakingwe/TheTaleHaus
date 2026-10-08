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

// Sends through Private Email's SMTP server when api/_config.php exists (written
// by the deploy from GitHub secrets), so messages are signed and pass SPF/DKIM.
// Falls back to PHP mail() otherwise.
function notify(string $subject, string $body, string $replyTo = ''): bool {
    if (is_file(__DIR__ . '/_config.php')) require_once __DIR__ . '/_config.php';
    $from = defined('SMTP_USER') ? SMTP_USER : FROM_EMAIL;
    $host = substr(strrchr($from, '@'), 1);
    $headers = [
        'Date: ' . date('r'),
        'Message-ID: <' . bin2hex(random_bytes(12)) . "@$host>",
        'From: The Tale Haus Website <' . $from . '>',
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=utf-8',
        'Content-Transfer-Encoding: 8bit',
    ];
    if ($replyTo && filter_var($replyTo, FILTER_VALIDATE_EMAIL)) $headers[] = "Reply-To: $replyTo";
    $subject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

    if (!defined('SMTP_USER')) {
        return mail(SITE_EMAIL, $subject, $body, implode("\r\n", $headers), '-f' . $from);
    }
    $msg = implode("\r\n", array_merge(['To: ' . SITE_EMAIL, "Subject: $subject"], $headers))
         . "\r\n\r\n" . str_replace("\n", "\r\n", str_replace("\r\n", "\n", $body));
    return smtp_send($from, SITE_EMAIL, $msg);
}

function smtp_send(string $from, string $to, string $msg): bool {
    $fp = @stream_socket_client('ssl://' . SMTP_HOST . ':465', $errno, $errstr, 15);
    if (!$fp) { error_log("SMTP connect failed: $errstr"); return false; }
    stream_set_timeout($fp, 15);
    $read = function () use ($fp): string {
        $out = '';
        while (($line = fgets($fp, 515)) !== false) {
            $out .= $line;
            if (strlen($line) < 4 || $line[3] === ' ') break;
        }
        return $out;
    };
    $cmd = function (string $c, string $expect) use ($fp, $read): bool {
        if ($c !== '') fwrite($fp, $c . "\r\n");
        $r = $read();
        if (strncmp($r, $expect, 3) !== 0) { error_log('SMTP: ' . trim($r)); return false; }
        return true;
    };
    // Lines starting with a dot must be doubled inside DATA.
    $data = preg_replace('/^\./m', '..', $msg);
    $ok = $cmd('', '220')
        && $cmd('EHLO thetale.haus', '250')
        && $cmd('AUTH LOGIN', '334')
        && $cmd(base64_encode(SMTP_USER), '334')
        && $cmd(base64_encode(SMTP_PASS), '235')
        && $cmd("MAIL FROM:<$from>", '250')
        && $cmd("RCPT TO:<$to>", '250')
        && $cmd('DATA', '354')
        && $cmd($data . "\r\n.", '250');
    fwrite($fp, "QUIT\r\n");
    fclose($fp);
    return $ok;
}
