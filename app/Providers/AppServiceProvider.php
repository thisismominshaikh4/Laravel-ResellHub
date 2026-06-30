<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Gate;
use App\Models\User;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        // Force HTTPS in production behind Railway proxy
        if ($this->app->isProduction() || env('APP_ENV') === 'production') {
            URL::forceScheme('https');
        }

        // Define gate for admin validation
        Gate::define('admin-access', function (User $user) {
            return $user->role === 'admin';
        });
    }
}
