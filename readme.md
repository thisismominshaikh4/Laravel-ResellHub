# ReSell Hub — Laravel 14 + React + Inertia.js Monolith

This repository contains the complete, unified rewrite of the **ReSell Hub** application (originally split into Next.js Client and Express.js + MongoDB Server) into a single monolithic, production-ready **Laravel 14 + React + Inertia.js** application.

---

## 🎯 Goal Accomplished

The legacy separate frontend/backend architecture has been compiled into a high-performance Monolithic architecture:
- **Core Framework**: Laravel 14 (PHP 8.3/8.4 + Composer packages).
- **Frontend Stack**: React 19 + Inertia.js (Zero separate API configurations or CORS blocks).
- **Database Engine**: PostgreSQL for scalable production deployments.
- **Role-based Dashboards**: Scaffolded dynamic views for **Buyers**, **Sellers**, and **Admins**.
- **Payment Processor**: Integrated Stripe payment simulator for card checkouts.

---

## 📂 Project Architecture

```
rewrite_into_react+laravel+enertia/
├── app/
│   ├── Http/Controllers/       <- Core endpoint handlers
│   └── Models/                 <- Eloquent database model mappings
├── config/                     <- Framework app configs
├── database/
│   ├── migrations/             <- PostgreSQL schema migrations
│   └── seeders/                <- Database seed states (Admin/Seller/Buyer accounts)
├── resources/
│   └── js/
│       ├── Layouts/            <- Nav bars and sidebar frames (Inertia responsive layouts)
│       └── Pages/              <- React view sheets (Index, Show, Dashboards, Analytics)
├── Procfile                    <- Railway process executor
├── nixpacks.toml               <- Nix build instructions
└── package.json                <- Merged NPM packages (Recharts, Stripe, Framer Motion)
```

---

## 🚀 Local Installation & Run

### Prerequisites
- PHP 8.3 or newer
- Composer
- Node.js & pnpm
- PostgreSQL database running locally

### Steps

1. **Clone & Install PHP Dependencies**:
   ```bash
   composer install
   ```

2. **Install Node Dependencies**:
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env` and fill in your database credentials:
   ```env
   DB_CONNECTION=pgsql
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_DATABASE=resellhub
   DB_USERNAME=postgres
   DB_PASSWORD=your_password
   ```

4. **Initialize Database Schema & Seeder**:
   Run the migrations and populate the database with mock accounts, listings, and reviews:
   ```bash
   php artisan migrate:fresh --seed
   ```

5. **Default Login Accounts**:
   - **Admin**: `admin@resellhub.com` / `password`
   - **Seller**: `seller@resellhub.com` / `password`
   - **Buyer**: `buyer@resellhub.com` / `password`

6. **Start Dev Servers**:
   Run the local Laravel server:
   ```bash
   php artisan serve
   ```
   In a separate terminal, start Vite:
   ```bash
   pnpm run dev
   ```

---

## 🚂 Deploying to Railway

This project is pre-configured for automated deployments on the latest **Railway** stack:

1. **Procfile**: Automatically boots Laravel server using the dynamic port injected by Railway:
   ```
   web: php artisan serve --host=0.0.0.0 --port=$PORT
   ```
2. **nixpacks.toml**: Declares PHP and Node build steps, installs PostgreSQL dependencies, runs Vite builds, and automatically runs `php artisan migrate --force` on release/boot.
3. **Environment Setup**:
   Link a **PostgreSQL** database service in Railway. Railway automatically injects connection parameters which Laravel picks up.
   Ensure you add the following variables inside Railway dashboard:
   - `APP_KEY` (Generate locally using `php artisan key:generate`)
   - `APP_ENV=production`
   - `APP_DEBUG=false`
   - `DB_CONNECTION=pgsql`
   
   > **Note**: The application is configured to automatically use `DATABASE_URL` as a fallback connection URL for Postgres, making deployment seamless.
