<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'buyer_id',
    'product_id',
    'product_title',
    'product_image',
    'notify_on_price_drop',
    'notify_on_availability',
    'is_active'
])]
class Alert extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'notify_on_price_drop' => 'boolean',
            'notify_on_availability' => 'boolean',
            'is_active' => 'boolean',
        ];
    }

    public function buyer()
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
