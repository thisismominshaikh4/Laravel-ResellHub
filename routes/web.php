<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\AlertController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

// 1. Public Routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/products', [ProductController::class, 'index'])->name('product.index');
Route::get('/products/{product}', [ProductController::class, 'show'])->name('product.show');

// 2. Authenticated Dashboard Redirect
Route::get('/dashboard', function () {
    $role = Auth::user()->role;
    if ($role === 'admin') {
        return redirect()->route('admin.analytics');
    } elseif ($role === 'seller') {
        return redirect()->route('seller.analytics');
    } else {
        return redirect()->route('buyer.orders');
    }
})->middleware(['auth', 'verified'])->name('dashboard');

// 3. Authenticated Routes Group
Route::middleware(['auth'])->group(function () {
    // Profile Management
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Product Listing CRUD & Actions
    Route::get('/listings/create', [ProductController::class, 'create'])->name('product.create');
    Route::post('/listings', [ProductController::class, 'store'])->name('product.store');
    Route::get('/listings/{product}/edit', [ProductController::class, 'edit'])->name('product.edit');
    Route::patch('/listings/{product}', [ProductController::class, 'update'])->name('product.update');
    Route::delete('/listings/{product}', [ProductController::class, 'destroy'])->name('product.destroy');
    Route::post('/products/{product}/report', [ProductController::class, 'report'])->name('product.report');
    Route::get('/my-listings', [ProductController::class, 'myListings'])->name('seller.listings');

    // Checkouts & Order Tracking
    Route::get('/checkout/{product}', [OrderController::class, 'checkout'])->name('order.checkout');
    Route::post('/orders', [OrderController::class, 'store'])->name('order.store');
    Route::get('/orders/success/{order}', [OrderController::class, 'success'])->name('order.success');
    Route::get('/my-orders', [OrderController::class, 'myOrders'])->name('buyer.orders');
    Route::get('/sales-orders', [OrderController::class, 'sellerOrders'])->name('seller.orders');
    Route::patch('/orders/{order}/status', [OrderController::class, 'updateStatus'])->name('order.status');

    // Payments
    Route::get('/payments/process/{order}', [PaymentController::class, 'process'])->name('payment.process');
    Route::post('/payments/create-intent', [PaymentController::class, 'createPaymentIntent'])->name('payment.intent');
    Route::post('/payments/confirm', [PaymentController::class, 'confirm'])->name('payment.confirm');
    
    // Analytics
    Route::get('/analytics/seller', [PaymentController::class, 'sellerAnalytics'])->name('seller.analytics');
    Route::get('/analytics/admin', [PaymentController::class, 'adminAnalytics'])->name('admin.analytics');

    // Reviews & Alerts
    Route::post('/reviews', [ReviewController::class, 'store'])->name('review.store');
    Route::post('/alerts', [AlertController::class, 'store'])->name('alert.store');
    Route::delete('/alerts/{alert}', [AlertController::class, 'destroy'])->name('alert.destroy');
    Route::get('/my-alerts', [AlertController::class, 'myAlerts'])->name('buyer.alerts');

    // Admin-Specific Moderation Panel
    Route::middleware(['can:admin-access'])->group(function () {
        Route::get('/admin/users', function () {
            $users = \App\Models\User::orderBy('created_at', 'desc')->get();
            return Inertia::render('Dashboard/AdminUsers', ['users' => $users]);
        })->name('admin.users');

        Route::patch('/admin/users/{user}/toggle-status', function (\App\Models\User $user) {
            $newStatus = $user->status === 'active' ? 'blocked' : 'active';
            $user->update(['status' => $newStatus]);
            return back()->with('success', 'User status updated to ' . $newStatus);
        })->name('admin.user.toggle');

        Route::get('/admin/reports', function () {
            $reports = \App\Models\Report::with('product')->orderBy('created_at', 'desc')->get();
            return Inertia::render('Dashboard/AdminReports', ['reports' => $reports]);
        })->name('admin.reports');

        Route::patch('/admin/reports/{report}/resolve', function (\App\Models\Report $report) {
            $report->update(['status' => 'resolved']);
            return back()->with('success', 'Report marked as resolved.');
        })->name('admin.report.resolve');
    });
});

require __DIR__.'/auth.php';
