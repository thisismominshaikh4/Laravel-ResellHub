<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        // 1. Get featured products
        $featuredProducts = Product::where('status', 'available')
            ->where('approval_status', 'approved')
            ->with('seller')
            ->orderBy('is_featured', 'desc')
            ->orderBy('created_at', 'desc')
            ->limit(8)
            ->get();

        // 2. Get marketplace stats
        $stats = [
            'totalProducts' => Product::where('status', 'available')->count(),
            'totalSellers' => User::where('role', 'seller')->count(),
            'totalBuyers' => User::where('role', 'buyer')->count(),
            'completedOrders' => Order::where('order_status', 'delivered')->count(),
        ];

        // 3. Get category list with counts
        $categories = Product::where('status', 'available')
            ->select('category')
            ->groupBy('category')
            ->selectRaw('category as name, count(*) as count')
            ->orderBy('count', 'desc')
            ->get();

        return Inertia::render('Welcome', [
            'featuredProducts' => $featuredProducts,
            'stats' => $stats,
            'categories' => $categories,
            'canLogin' => route('login'),
            'canRegister' => route('register'),
        ]);
    }
}
