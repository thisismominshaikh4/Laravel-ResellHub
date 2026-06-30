<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_id' => Product::factory(),
            'product_title' => function (array $attributes) {
                return Product::find($attributes['product_id'])->title;
            },
            'product_image' => null,
            'buyer_id' => User::factory(),
            'buyer_name' => function (array $attributes) {
                return User::find($attributes['buyer_id'])->name;
            },
            'buyer_email' => function (array $attributes) {
                return User::find($attributes['buyer_id'])->email;
            },
            'buyer_phone' => function (array $attributes) {
                return User::find($attributes['buyer_id'])->phone;
            },
            'buyer_address' => fake()->address(),
            'seller_id' => function (array $attributes) {
                return Product::find($attributes['product_id'])->seller_id;
            },
            'seller_name' => function (array $attributes) {
                return User::find($attributes['seller_id'])->name;
            },
            'seller_email' => function (array $attributes) {
                return User::find($attributes['seller_id'])->email;
            },
            'price' => function (array $attributes) {
                return Product::find($attributes['product_id'])->price;
            },
            'quantity' => 1,
            'order_status' => 'pending',
            'payment_method' => 'stripe',
            'payment_status' => 'pending',
            'transaction_id' => null,
            'delivery_address' => function (array $attributes) {
                return $attributes['buyer_address'];
            },
            'notes' => fake()->sentence(),
        ];
    }
}
