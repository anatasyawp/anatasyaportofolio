<?php
/**
 * post-deploy.php
 * Script ini dijalankan SEKALI setelah FTP upload selesai.
 * Upload file ini ke root server lalu akses via browser:
 * https://hianatasya.my.id/post-deploy.php?key=DEPLOY_SECRET_KEY
 *
 * PENTING: Hapus file ini setelah dijalankan!
 */

// Kunci keamanan — ganti dengan string acak milik kamu
$secret = $_GET['key'] ?? '';
$expectedKey = getenv('DEPLOY_SECRET') ?: 'tasya-deploy-2026';

if ($secret !== $expectedKey) {
    http_response_code(403);
    die('Akses ditolak.');
}

header('Content-Type: text/plain; charset=utf-8');

$rootDir = __DIR__;
$artisan  = $rootDir . '/artisan';

if (!file_exists($artisan)) {
    echo "❌ artisan tidak ditemukan di: $rootDir\n";
    exit(1);
}

$commands = [
    'config:clear',
    'config:cache',
    'route:clear',
    'route:cache',
    'view:clear',
    'view:cache',
    'migrate --force',
    'storage:link',
];

echo "🚀 Menjalankan post-deploy Laravel...\n\n";

foreach ($commands as $cmd) {
    $output = shell_exec("php $artisan $cmd 2>&1");
    echo "▶ php artisan $cmd\n";
    echo $output . "\n";
}

echo "\n✅ Selesai! Hapus file post-deploy.php dari server setelah ini.\n";

