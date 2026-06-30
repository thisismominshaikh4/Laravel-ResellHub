<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:500',
            'order_id' => 'nullable|exists:orders,id',
        ]);

        $product = Product::findOrFail($request->product_id);

        // Check if there is an existing review for this buyer/product combo
        $existing = Review::where('product_id', $product->id)
            ->where('reviewer_id', Auth::id())
            ->first();

        if ($existing) {
            return back()->withErrors(['product_id' => 'You have already reviewed this product.']);
        }

        Review::create([
            'product_id' => $product->id,
            'seller_id' => $product->seller_id,
            'reviewer_id' => Auth::id(),
            'reviewer_name' => Auth::user()->name,
            'reviewer_photo' => Auth::user()->photo ?: '',
            'rating' => intval($request->rating),
            'comment' => $request->comment,
            'order_id' => $request->order_id,
        ]);

        return back()->with('success', 'Review submitted successfully.');
    }
}
