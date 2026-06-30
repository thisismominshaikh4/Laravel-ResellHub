<?php

namespace App\Http\Controllers;

use App\Models\Alert;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AlertController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'notify_on_price_drop' => 'nullable|boolean',
            'notify_on_availability' => 'nullable|boolean',
        ]);

        $product = Product::findOrFail($request->product_id);

        $alert = Alert::updateOrCreate(
            [
                'buyer_id' => Auth::id(),
                'product_id' => $product->id,
            ],
            [
                'product_title' => $product->title,
                'product_image' => !empty($product->images) ? $product->images[0] : null,
                'notify_on_price_drop' => $request->has('notify_on_price_drop') ? $request->notify_on_price_drop : true,
                'notify_on_availability' => $request->has('notify_on_availability') ? $request->notify_on_availability : true,
                'is_active' => true,
            ]
        );

        return back()->with('success', 'Price/Availability alerts set for ' . $product->title);
    }

    public function destroy(Alert $alert)
    {
        if ($alert->buyer_id !== Auth::id()) {
            abort(403, 'Unauthorized.');
        }

        $alert->delete();

        return back()->with('success', 'Alert removed.');
    }

    public function myAlerts()
    {
        $alerts = Alert::where('buyer_id', Auth::id())
            ->with('product')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Dashboard/BuyerAlerts', [
            'alerts' => $alerts,
        ]);
    }
}
