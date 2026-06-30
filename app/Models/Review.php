<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'product_id',
    'seller_id',
    'reviewer_id',
    'reviewer_name',
    'reviewer_photo',
    'rating',
    'comment',
    'order_id'
])]
class Review extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'rating' => 'integer',
        ];
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function seller()
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    public function reviewer()
    {
        return $this->belongsTo(User::class, 'reviewer_id');
    }

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }
}
