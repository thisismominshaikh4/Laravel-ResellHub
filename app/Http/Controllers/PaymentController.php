<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Payment;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function process(Order $order)
    {
        // Authorize buyer
        if ($order->buyer_id !== Auth::id()) {
            abort(403, 'Unauthorized.');
        }

        return Inertia::render('Checkout/Payment', [
            'order' => $order,
            'stripePublicKey' => env('STRIPE_KEY') ?: 'pk_test_mock',
        ]);
    }

    public function createPaymentIntent(Request $request)
    {
        $request->validate(['order_id' => 'required|exists:orders,id']);
        $order = Order::findOrFail($request->order_id);

        $amount = $order->price * $order->quantity;
        $stripeSecret = env('STRIPE_SECRET_KEY');

        if ($stripeSecret && !str_contains($stripeSecret, 'mock') && str_starts_with($stripeSecret, 'sk_')) {
            try {
                \Stripe\Stripe::setApiKey($stripeSecret);
                $intent = \Stripe\PaymentIntent::create([
                    'amount' => intval(round($amount * 100)),
                    'currency' => 'usd',
                    'metadata' => ['order_id' => strval($order->id)],
                ]);

                return response()->json([
                    'clientSecret' => $intent->client_secret,
                    'transactionId' => $intent->id,
                ]);
            } catch (\Exception $e) {
                // Fall back to mock
            }
        }

        // Mock payment intent details
        return response()->json([
            'clientSecret' => 'mock_client_secret_' . $order->id . '_' . time(),
            'transactionId' => 'TXN-' . time() . '-' . rand(1000, 9999),
        ]);
    }

    public function confirm(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id',
            'transaction_id' => 'nullable|string',
            'amount' => 'nullable|numeric',
        ]);

        $order = Order::findOrFail($request->order_id);

        if ($order->buyer_id !== Auth::id()) {
            abort(403, 'Unauthorized.');
        }

        $finalAmount = $request->amount ?: ($order->price * $order->quantity);
        $txnId = $request->transaction_id ?: 'TXN-' . time();

        DB::transaction(function () use ($order, $txnId, $finalAmount) {
            // Save Payment Record
            Payment::create([
                'order_id' => $order->id,
                'buyer_id' => $order->buyer_id,
                'seller_id' => $order->seller_id,
                'product_id' => $order->product_id,
                'amount' => $finalAmount,
                'payment_method' => 'card',
                'payment_status' => 'paid',
                'transaction_id' => $txnId,
            ]);

            // Update Order
            $order->update([
                'payment_status' => 'paid',
                'transaction_id' => $txnId,
            ]);

            // Reduce product stock
            $product = Product::find($order->product_id);
            if ($product) {
                $product->decrement('stock_quantity', $order->quantity);
                if ($product->stock_quantity <= 0) {
                    $product->update(['status' => 'sold']);
                }
            }
        });

        return redirect()->route('order.success', $order->id)
            ->with('success', 'Payment successful! Your order has been placed.');
    }

    public function sellerAnalytics()
    {
        $sellerId = Auth::id();

        // 1. Core card metrics
        $totalProducts = Product::where('seller_id', $sellerId)->count();
        $paidOrders = Order::where('seller_id', $sellerId)
            ->where('payment_status', 'paid')
            ->get();
        
        $pendingOrders = Order::where('seller_id', $sellerId)
            ->whereIn('order_status', ['pending', 'accepted', 'processing'])
            ->count();

        $totalRevenue = $paidOrders->sum(fn($o) => $o->price * $o->quantity);
        $totalSales = $paidOrders->sum('quantity');

        // 2. Sales Trend (Last 6 Months)
        $months = [];
        $now = now();
        for ($i = 5; $i >= 0; $i--) {
            $d = $now->copy()->subMonths($i);
            $months[] = [
                'year' => $d->year,
                'monthIdx' => $d->month - 1,
                'month' => $d->format('M'),
            ];
        }

        $monthlySalesTrend = [];
        foreach ($months as $m) {
            $sales = Order::where('seller_id', $sellerId)
                ->where('payment_status', 'paid')
                ->whereYear('created_at', $m['year'])
                ->whereMonth('created_at', $m['monthIdx'] + 1)
                ->get()
                ->sum(fn($o) => $o->price * $o->quantity);

            $monthlySalesTrend[] = [
                'month' => $m['month'],
                'sales' => $sales,
            ];
        }

        // 3. Top selling products
        $topProducts = Order::where('seller_id', $sellerId)
            ->where('payment_status', 'paid')
            ->select('product_id', 'product_title', 'price', DB::raw('SUM(quantity) as quantity_sold'), DB::raw('SUM(price * quantity) as total_revenue'))
            ->groupBy('product_id', 'product_title', 'price')
            ->orderBy('total_revenue', 'desc')
            ->limit(5)
            ->get();

        return Inertia::render('Dashboard/SellerAnalytics', [
            'cards' => [
                'totalProducts' => $totalProducts,
                'totalSales' => $totalSales,
                'totalRevenue' => $totalRevenue,
                'pendingOrders' => $pendingOrders,
            ],
            'charts' => [
                'monthlySalesTrend' => $monthlySalesTrend,
                'topSellingProducts' => $topProducts,
            ],
        ]);
    }

    public function adminAnalytics()
    {
        // 1. Core card metrics
        $totalUsers = User::count();
        $totalProducts = Product::count();
        $totalOrders = Order::count();
        $paidOrders = Order::where('payment_status', 'paid')->get();
        $completedOrders = Order::where('order_status', 'delivered')->count();

        $totalRevenue = $paidOrders->sum(fn($o) => $o->price * $o->quantity);

        // 2. Trend Metrics (Last 6 Months)
        $months = [];
        $now = now();
        for ($i = 5; $i >= 0; $i--) {
            $d = $now->copy()->subMonths($i);
            $months[] = [
                'year' => $d->year,
                'monthIdx' => $d->month - 1,
                'month' => $d->format('M'),
            ];
        }

        $userGrowth = [];
        $monthlyOrders = [];
        foreach ($months as $m) {
            $userGrowth[] = [
                'month' => $m['month'],
                'users' => User::whereYear('created_at', $m['year'])
                    ->whereMonth('created_at', $m['monthIdx'] + 1)
                    ->count(),
            ];

            $monthlyOrders[] = [
                'month' => $m['month'],
                'ordersCount' => Order::whereYear('created_at', $m['year'])
                    ->whereMonth('created_at', $m['monthIdx'] + 1)
                    ->count(),
            ];
        }

        // 3. Category Breakdown
        $categoryPerformance = Product::select('category', DB::raw('count(*) as count'))
            ->groupBy('category')
            ->orderBy('count', 'desc')
            ->get();

        return Inertia::render('Dashboard/AdminAnalytics', [
            'cards' => [
                'totalUsers' => $totalUsers,
                'totalProducts' => $totalProducts,
                'totalOrders' => $totalOrders,
                'totalRevenue' => $totalRevenue,
                'completedOrders' => $completedOrders,
            ],
            'charts' => [
                'userGrowth' => $userGrowth,
                'monthlyOrders' => $monthlyOrders,
                'categoryPerformance' => $categoryPerformance,
            ],
        ]);
    }
}
