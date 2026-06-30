<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Review;
use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::where('status', 'available')
            ->where('approval_status', 'approved')
            ->with('seller');

        // Search filter
        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%')
                  ->orWhere('category', 'like', '%' . $request->search . '%');
            });
        }

        // Category filter
        if ($request->category && $request->category !== 'all' && $request->category !== 'All') {
            $query->where('category', $request->category);
        }

        // Condition filter
        if ($request->condition && $request->condition !== 'all' && $request->condition !== 'All') {
            $query->where('condition', $request->condition);
        }

        // Location filter
        if ($request->location) {
            $query->where('location', 'like', '%' . $request->location . '%');
        }

        // Price range filter
        if ($request->minPrice) {
            $query->where('price', '>=', floatval($request->minPrice));
        }
        if ($request->maxPrice) {
            $query->where('price', '<=', floatval($request->maxPrice));
        }

        // Sorting
        $sortBy = $request->sortBy ?: 'newest';
        if ($sortBy === 'oldest') {
            $query->orderBy('created_at', 'asc');
        } elseif ($sortBy === 'priceLowToHigh') {
            $query->orderBy('price', 'asc');
        } elseif ($sortBy === 'priceHighToLow') {
            $query->orderBy('price', 'desc');
        } else {
            $query->orderBy('created_at', 'desc');
        }

        $products = $query->paginate(12)->withQueryString();

        return Inertia::render('Products/Index', [
            'products' => $products,
            'queryParams' => $request->query() ?: null,
        ]);
    }

    public function show(Product $product)
    {
        // Increment views
        $product->increment('views');

        // Fetch reviews
        $reviews = Review::where('product_id', $product->id)
            ->orderBy('created_at', 'desc')
            ->get();

        $product->load('seller');

        return Inertia::render('Products/Show', [
            'product' => $product,
            'reviews' => $reviews,
        ]);
    }

    public function create()
    {
        return Inertia::render('Products/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string',
            'condition' => 'required|in:New,Like New,Used,Refurbished,Good,Fair,Poor',
            'price' => 'required|numeric|min:0',
            'description' => 'required|string',
            'location' => 'nullable|string',
            'stock_quantity' => 'nullable|integer|min:0',
        ]);

        $product = Product::create([
            'title' => $request->title,
            'category' => $request->category,
            'condition' => $request->condition,
            'price' => $request->price,
            'description' => $request->description,
            'images' => $request->images ?: [],
            'seller_id' => Auth::id(),
            'status' => 'available',
            'approval_status' => 'approved', // Auto-approved in this mock, admin can reject
            'stock_quantity' => intval($request->stock_quantity ?? 1),
            'location' => $request->location ?: Auth::user()->location ?: '',
            'is_featured' => false,
            'views' => 0,
        ]);

        return redirect()->route('product.show', $product->id)
            ->with('success', 'Product listed successfully.');
    }

    public function edit(Product $product)
    {
        // Authorize seller
        if (Auth::user()->role !== 'admin' && $product->seller_id !== Auth::id()) {
            abort(403, 'Unauthorized.');
        }

        return Inertia::render('Products/Edit', [
            'product' => $product,
        ]);
    }

    public function update(Request $request, Product $product)
    {
        // Authorize seller
        if (Auth::user()->role !== 'admin' && $product->seller_id !== Auth::id()) {
            abort(403, 'Unauthorized.');
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string',
            'condition' => 'required|in:New,Like New,Used,Refurbished,Good,Fair,Poor',
            'price' => 'required|numeric|min:0',
            'description' => 'required|string',
            'location' => 'nullable|string',
            'stock_quantity' => 'nullable|integer|min:0',
            'status' => 'nullable|string',
        ]);

        $product->update($request->all());

        return redirect()->route('product.show', $product->id)
            ->with('success', 'Product listing updated.');
    }

    public function destroy(Product $product)
    {
        // Authorize seller
        if (Auth::user()->role !== 'admin' && $product->seller_id !== Auth::id()) {
            abort(403, 'Unauthorized.');
        }

        $product->delete();

        return redirect()->route('dashboard')
            ->with('success', 'Product deleted.');
    }

    public function myListings()
    {
        $products = Product::where('seller_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Dashboard/SellerListings', [
            'products' => $products,
        ]);
    }

    public function report(Request $request, Product $product)
    {
        $request->validate([
            'reason' => 'required|string|max:255',
            'details' => 'nullable|string',
        ]);

        Report::create([
            'product_id' => $product->id,
            'product_title' => $product->title,
            'reporter_id' => Auth::id(),
            'reporter_name' => Auth::user()->name,
            'reporter_email' => Auth::user()->email,
            'reason' => $request->reason,
            'details' => $request->details ?: '',
            'status' => 'pending',
        ]);

        return back()->with('success', 'Thank you for reporting. Admin will review the listing.');
    }
}
