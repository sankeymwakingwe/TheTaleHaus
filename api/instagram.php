<?php
// Latest Instagram posts for the moving strip on the services page.
// Uses the Instagram API (with Instagram login) and a long-lived token from
// the INSTAGRAM_TOKEN secret. Results are cached for an hour, and the token is
// refreshed automatically before its 60 days run out.
require __DIR__ . '/_lib.php';
if (is_file(__DIR__ . '/_config.php')) require_once __DIR__ . '/_config.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=600');

const IG_CACHE = DATA_DIR . '/instagram.json';
const IG_TOKEN_FILE = DATA_DIR . '/instagram-token.json';
const IG_CACHE_SECONDS = 3600;

function ig_out(array $posts): void {
    echo json_encode(['ok' => true, 'posts' => $posts]);
    exit;
}

function ig_get(string $url): ?array {
    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 10]);
        $body = curl_exec($ch);
        $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
    } else {
        $body = @file_get_contents($url, false, stream_context_create(['http' => ['timeout' => 10, 'ignore_errors' => true]]));
        $code = $body === false ? 0 : 200;
    }
    if (!$body || $code >= 400) { error_log("Instagram API $code: " . substr((string)$body, 0, 300)); return null; }
    return json_decode($body, true) ?: null;
}

if (!is_dir(DATA_DIR)) mkdir(DATA_DIR, 0750, true);
$cached = is_file(IG_CACHE) ? json_decode((string)file_get_contents(IG_CACHE), true) : null;
if ($cached && time() - ($cached['at'] ?? 0) < IG_CACHE_SECONDS) ig_out($cached['posts']);

// Token: the refreshed copy on the server wins over the one from the deploy,
// unless a new token has been deployed since.
$deployed = defined('INSTAGRAM_TOKEN') ? INSTAGRAM_TOKEN : '';
$saved = is_file(IG_TOKEN_FILE) ? json_decode((string)file_get_contents(IG_TOKEN_FILE), true) : null;
if ($saved && ($saved['from'] ?? '') !== hash('sha256', $deployed)) $saved = null;
$token = $saved['token'] ?? $deployed;
if ($token === '') ig_out($cached['posts'] ?? []);

// Refresh roughly every 30 days (tokens last 60).
if (time() - ($saved['at'] ?? 0) > 30 * 86400) {
    $r = ig_get('https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=' . urlencode($token));
    if (!empty($r['access_token'])) {
        $token = $r['access_token'];
        file_put_contents(IG_TOKEN_FILE, json_encode(['token' => $token, 'at' => time(), 'from' => hash('sha256', $deployed)]), LOCK_EX);
        @chmod(IG_TOKEN_FILE, 0600);
    }
}

$r = ig_get('https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink,caption&limit=12&access_token=' . urlencode($token));
if (!$r || !isset($r['data'])) ig_out($cached['posts'] ?? []);   // keep showing the last good set

$posts = [];
foreach ($r['data'] as $m) {
    $image = ($m['media_type'] ?? '') === 'VIDEO' ? ($m['thumbnail_url'] ?? '') : ($m['media_url'] ?? '');
    if (!$image || empty($m['permalink'])) continue;
    $posts[] = [
        'image' => $image,
        'url' => $m['permalink'],
        'caption' => mb_substr(trim((string)($m['caption'] ?? '')), 0, 120),
    ];
}
file_put_contents(IG_CACHE, json_encode(['at' => time(), 'posts' => $posts]), LOCK_EX);
ig_out($posts);
