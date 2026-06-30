FROM php:8.4-cli

RUN apt-get update && apt-get install -y --no-install-recommends \
        git curl unzip libpng-dev libonig-dev libxml2-dev libzip-dev libpq-dev libicu-dev \
    && docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl bcmath gd zip intl \
    && pecl install redis && docker-php-ext-enable redis \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && corepack enable \
    && corepack prepare pnpm@9 --activate \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /var/www

COPY . .

RUN composer install --no-dev --optimize-autoloader --no-interaction \
    && pnpm install --frozen-lockfile \
    && pnpm build \
    && mkdir -p storage/framework/{sessions,views,cache} storage/logs storage/app/public bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache

EXPOSE 8080

CMD ["sh", "-c", "php artisan config:clear 2>/dev/null; php artisan route:clear 2>/dev/null; php artisan view:clear 2>/dev/null; php artisan storage:link --force 2>/dev/null; php artisan migrate --force 2>/dev/null; php artisan db:seed --force 2>/dev/null; exec php artisan serve --host=0.0.0.0 --port=${PORT:-8080}"]
