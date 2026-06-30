<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'product_id',
    'product_title',
    'product_image',
    'buyer_id',
    'buyer_name',
    'buyer_email',
    'buyer_phone',
    'buyer_address',
    'seller_id',
    'seller_name',
    'seller_email',
    'price',
    'quantity',
    'order_status',
    'payment_method',
    'payment_status',
    'transaction_id',
    'delivery_address',
    'notes'
])]
class Order extends Model
{
    use HasFactory;

    protected $appends = ['amount', 'totalAmount'];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'quantity' => 'integer',
        ];
    }

    public function getAmountAttribute()
    {
        return $this->price * $this->quantity;
    }

    public function getTotalAmountAttribute()
    {
        return $this->price * $this->quantity;
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function buyer()
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    public function seller()
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    public function payment()
    {
        return $this->hasOne(Payment::class, 'order_id');
    }
}
