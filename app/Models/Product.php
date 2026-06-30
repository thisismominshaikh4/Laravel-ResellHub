<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'title',
    'category',
    'condition',
    'price',
    'description',
    'images',
    'seller_id',
    'status',
    'approval_status',
    'stock_quantity',
    'location',
    'is_featured',
    'views'
])]
class Product extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'images' => 'array',
            'price' => 'decimal:2',
            'is_featured' => 'boolean',
            'stock_quantity' => 'integer',
            'views' => 'integer',
        ];
    }

    public function seller()
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    public function orders()
    {
        return $this->hasMany(Order::class, 'product_id');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class, 'product_id');
    }

    public function reports()
    {
        return $this->hasMany(Report::class, 'product_id');
    }

    public function alerts()
    {
        return $this->hasMany(Alert::class, 'product_id');
    }
}
