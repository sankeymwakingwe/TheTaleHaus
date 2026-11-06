<?php
// Latest Instagram posts for the moving strip on the services page.
// Uses the Instagram API (with Instagram login) and a long-lived token from
// the INSTAGRAM_TOKEN secret. Results are cached for an hour, and the token is
// refreshed automatically before its 60 days run out.
require __DIR__ . '/_lib.php';
if (is_file(__DIR__ . '/_config.php')) require_once __DIR__ . '/_config.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=600');

const IG_CACHE = DATA_DIR . '/instagram-v2.json';
// Instagram's image links expire and its CDN often refuses to show them on
// other sites, so each post's picture is saved here and served from our domain.
const IG_IMG_DIR = __DIR__ . '/../images/ig';
const IG_IMG_URL = 'images/ig';
const IG_TOKEN_FILE = DATA_DIR . '/instagram-token.json';
const IG_CACHE_SECONDS = 3600;

$IG_ERROR = '';   // why the last live fetch failed, shown in the response for diagnosis

function ig_out(array $posts): void {
    global $IG_ERROR;
    $out = ['ok' => true, 'posts' => $posts];
    if ($IG_ERROR !== '') $out['error'] = $IG_ERROR;
    echo json_encode($out);
    exit;
}

function ig_fetch_raw(string $url): ?string {
    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 15, CURLOPT_FOLLOWLOCATION => true]);
        $body = curl_exec($ch);
        $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        return ($body !== false && $code < 400) ? $body : null;
    }
    $body = @file_get_contents($url, false, stream_context_create(['http' => ['timeout' => 15]]));
    return $body === false ? null : $body;
}

// Save a post's picture on our server once; returns its local URL, or null.
function ig_local_image(string $id, string $remote): ?string {
    if (!preg_match('/^\w+$/', $id)) return null;
    if (!is_dir(IG_IMG_DIR)) @mkdir(IG_IMG_DIR, 0755, true);
    $file = IG_IMG_DIR . "/$id.jpg";
    if (!is_file($file)) {
        $data = ig_fetch_raw($remote);
        if ($data === null || strlen($data) < 500) return null;
        file_put_contents($file, $data, LOCK_EX);
    }
    return IG_IMG_URL . "/$id.jpg?v=" . filemtime($file);
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
    if (!$body || $code >= 400) {
        global $IG_ERROR;
        $msg = json_decode((string)$body, true)['error']['message'] ?? ($body ? "HTTP $code" : 'no response from Instagram');
        $IG_ERROR = mb_substr((string)$msg, 0, 200);
        error_log("Instagram API $code: " . substr((string)$body, 0, 300));
        return null;
    }
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
if ($token === '') { $IG_ERROR = 'no Instagram token on the server'; ig_out($cached['posts'] ?? []); }

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
$IG_ERROR = '';   // the feed answered; an earlier refresh hiccup doesn't matter

$posts = [];
foreach ($r['data'] as $m) {
    $image = ($m['media_type'] ?? '') === 'VIDEO' ? ($m['thumbnail_url'] ?? '') : ($m['media_url'] ?? '');
    if (!$image || empty($m['permalink'])) continue;
    $local = ig_local_image((string)($m['id'] ?? ''), $image);
    if ($local === null) continue;
    $posts[] = [
        'image' => $local,
        'url' => $m['permalink'],
        'caption' => mb_substr(trim((string)($m['caption'] ?? '')), 0, 120),
    ];
}
if (!$posts) { $IG_ERROR = $IG_ERROR ?: 'could not save any post images on the server'; ig_out($cached['posts'] ?? []); }
// Tidy away pictures of posts that are no longer among the latest.
$keep = array_map(fn($p) => basename(strtok($p['image'], '?')), $posts);
foreach (glob(IG_IMG_DIR . '/*.jpg') ?: [] as $f) if (!in_array(basename($f), $keep, true)) @unlink($f);
file_put_contents(IG_CACHE, json_encode(['at' => time(), 'posts' => $posts]), LOCK_EX);
ig_out($posts);
