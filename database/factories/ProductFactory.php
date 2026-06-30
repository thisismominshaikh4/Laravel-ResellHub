<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->words(3, true),
            'category' => fake()->randomElement(['Electronics', 'Books', 'Clothing', 'Furniture', 'Sports', 'Toys', 'Other']),
            'condition' => fake()->randomElement(['New', 'Like New', 'Used', 'Refurbished', 'Good', 'Fair', 'Poor']),
            'price' => fake()->randomFloat(2, 5, 800),
            'description' => fake()->paragraph(),
            'images' => [],
            'seller_id' => User::factory()->seller(),
            'status' => 'available',
            'approval_status' => 'approved',
            'stock_quantity' => fake()->numberBetween(1, 5),
            'location' => fake()->city(),
            'is_featured' => fake()->boolean(15),
            'views' => fake()->numberBetween(0, 150),
        ];
    }
}
