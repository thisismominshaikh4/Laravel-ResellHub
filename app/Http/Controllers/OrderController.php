<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function checkout(Product $product)
    {
        $product->load('seller');

        return Inertia::render('Checkout/Index', [
            'product' => $product,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'buyer_phone' => 'nullable|string',
            'buyer_address' => 'nullable|string',
            'quantity' => 'required|integer|min:1',
            'payment_method' => 'required|in:stripe,card,cod,bkash',
            'notes' => 'nullable|string',
        ]);

        $product = Product::findOrFail($request->product_id);
        
        // Prevent purchasing own product
        if ($product->seller_id === Auth::id()) {
            return back()->withErrors(['product_id' => 'You cannot purchase your own product.']);
        }

        // Check stock
        if ($product->stock_quantity < $request->quantity) {
            return back()->withErrors(['quantity' => 'Insufficient stock quantity available.']);
        }

        $order = Order::create([
            'product_id' => $product->id,
            'product_title' => $product->title,
            'product_image' => !empty($product->images) ? $product->images[0] : null,
            'buyer_id' => Auth::id(),
            'buyer_name' => Auth::user()->name,
            'buyer_email' => Auth::user()->email,
            'buyer_phone' => $request->buyer_phone ?: Auth::user()->phone ?: '',
            'buyer_address' => $request->buyer_address ?: Auth::user()->location ?: '',
            'seller_id' => $product->seller_id,
            'seller_name' => $product->seller?->name ?: 'Unknown',
            'seller_email' => $product->seller?->email ?: '',
            'price' => $product->price,
            'quantity' => intval($request->quantity),
            'order_status' => 'pending',
            'payment_method' => $request->payment_method,
            'payment_status' => $request->payment_method === 'cod' ? 'pending' : 'pending', // card/stripe will change to paid after payment intent confirmation
            'delivery_address' => $request->buyer_address ?: Auth::user()->location ?: '',
            'notes' => $request->notes ?: '',
        ]);

        // If card/stripe: Redirect to payment page. Else (COD), reduce stock immediately and complete checkout.
        if ($request->payment_method === 'stripe' || $request->payment_method === 'card') {
            return redirect()->route('payment.process', $order->id);
        } else {
            // COD setup
            $product->decrement('stock_quantity', $order->quantity);
            if ($product->stock_quantity <= 0) {
                $product->update(['status' => 'sold']);
            }
            return redirect()->route('order.success', $order->id)
                ->with('success', 'Order created successfully. Cash on delivery scheduled.');
        }
    }

    public function myOrders()
    {
        $orders = Order::where('buyer_id', Auth::id())
            ->with('product')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Dashboard/BuyerOrders', [
            'orders' => $orders,
        ]);
    }

    public function sellerOrders()
    {
        $orders = Order::where('seller_id', Auth::id())
            ->with('product')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Dashboard/SellerOrders', [
            'orders' => $orders,
        ]);
    }

    public function updateStatus(Request $request, Order $order)
    {
        // Authorize seller
        if (Auth::user()->role !== 'admin' && $order->seller_id !== Auth::id()) {
            abort(403, 'Unauthorized.');
        }

        $request->validate([
            'order_status' => 'required|in:pending,accepted,processing,shipped,delivered,cancelled,refunded',
        ]);

        $order->update([
            'order_status' => $request->order_status,
        ]);

        return back()->with('success', 'Order status updated to ' . $request->order_status);
    }

    public function success(Order $order)
    {
        return Inertia::render('Checkout/Success', [
            'order' => $order,
        ]);
    }
}
