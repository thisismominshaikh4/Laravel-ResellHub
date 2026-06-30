<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
use App\Models\Review;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create standard seed accounts
        $admin = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@resellhub.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'is_verified' => true,
        ]);

        $seller = User::factory()->create([
            'name' => 'Seller John',
            'email' => 'seller@resellhub.com',
            'password' => Hash::make('password'),
            'role' => 'seller',
            'is_verified' => true,
            'phone' => '+1 (555) 019-2834',
            'location' => 'San Francisco, CA',
        ]);

        $buyer = User::factory()->create([
            'name' => 'Buyer Alice',
            'email' => 'buyer@resellhub.com',
            'password' => Hash::make('password'),
            'role' => 'buyer',
            'phone' => '+1 (555) 014-9821',
            'location' => 'Seattle, WA',
        ]);

        // 2. Create additional mock users
        $sellers = User::factory(5)->seller()->create();
        $buyers = User::factory(5)->create();

        // 3. Create mock products across categories
        $categories = ['Electronics', 'Books', 'Clothing', 'Furniture', 'Sports', 'Toys'];
        $conditions = ['New', 'Like New', 'Used', 'Good', 'Fair'];
        
        $sellerIds = $sellers->pluck('id')->push($seller->id);
        $buyerIds = $buyers->pluck('id')->push($buyer->id);

        foreach ($sellerIds as $sId) {
            $user = User::find($sId);
            // Create 3-4 products for each seller
            for ($i = 0; $i < fake()->numberBetween(3, 5); $i++) {
                $category = fake()->randomElement($categories);
                $condition = fake()->randomElement($conditions);
                $price = fake()->randomFloat(2, 10, 450);

                $product = Product::factory()->create([
                    'seller_id' => $sId,
                    'category' => $category,
                    'condition' => $condition,
                    'price' => $price,
                ]);

                // Create reviews for some products
                if (fake()->boolean(70)) {
                    $reviewerId = fake()->randomElement($buyerIds);
                    $reviewer = User::find($reviewerId);

                    Review::factory()->create([
                        'product_id' => $product->id,
                        'seller_id' => $sId,
                        'reviewer_id' => $reviewerId,
                        'reviewer_name' => $reviewer->name,
                        'rating' => fake()->numberBetween(3, 5),
                        'comment' => fake()->randomElement([
                            'Amazing product, works perfectly!',
                            'Reasonable price for the condition.',
                            'Great communication with the seller, highly recommended!',
                            'Good quality and fast processing.',
                            'Item exactly as described in the listing.'
                        ]),
                    ]);
                }
            }
        }
    }
}
