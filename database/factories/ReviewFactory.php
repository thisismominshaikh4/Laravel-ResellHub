<?php

namespace Database\Factories;

use App\Models\Review;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Review>
 */
class ReviewFactory extends Factory
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
            'seller_id' => function (array $attributes) {
                return Product::find($attributes['product_id'])->seller_id;
            },
            'reviewer_id' => User::factory(),
            'reviewer_name' => function (array $attributes) {
                return User::find($attributes['reviewer_id'])->name;
            },
            'reviewer_photo' => '',
            'rating' => fake()->numberBetween(3, 5),
            'comment' => fake()->paragraph(),
            'order_id' => null,
        ];
    }
}
