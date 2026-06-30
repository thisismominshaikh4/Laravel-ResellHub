#!/bin/sh
set -e

php artisan config:clear 2>/dev/null || true
php artisan route:clear 2>/dev/null || true
php artisan view:clear 2>/dev/null || true
php artisan storage:link --force 2>/dev/null || true
php artisan migrate --force 2>/dev/null || true
php artisan db:seed --force 2>/dev/null || true

exec php artisan serve --host=0.0.0.0 --port="${PORT:-8080}"
