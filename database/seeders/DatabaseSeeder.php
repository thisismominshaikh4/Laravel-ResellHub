<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
use App\Models\Review;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    private array $products = [
        'Electronics' => [
            ['title' => 'Sony WH-1000XM5 Headphones', 'price' => 249.99, 'condition' => 'Like New', 'images' => ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop']],
            ['title' => 'Apple iPad Air 5th Generation', 'price' => 389.00, 'condition' => 'New', 'images' => ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=400&fit=crop']],
            ['title' => 'Samsung Galaxy S23 Ultra', 'price' => 699.99, 'condition' => 'Used', 'images' => ['https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=400&fit=crop']],
            ['title' => 'Logitech MX Master 3S Mouse', 'price' => 65.00, 'condition' => 'New', 'images' => ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=400&fit=crop']],
            ['title' => 'Canon EOS Rebel T8i Camera', 'price' => 549.00, 'condition' => 'Good', 'images' => ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=400&fit=crop']],
            ['title' => 'Bose SoundLink Flex Speaker', 'price' => 89.99, 'condition' => 'Like New', 'images' => ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=400&fit=crop']],
            ['title' => 'Dell 27-inch 4K Monitor', 'price' => 275.00, 'condition' => 'Good', 'images' => ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=400&fit=crop']],
            ['title' => 'Razer BlackWidow V4 Keyboard', 'price' => 129.99, 'condition' => 'New', 'images' => ['https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&h=400&fit=crop']],
            ['title' => 'JBL Charge 5 Portable Speaker', 'price' => 119.00, 'condition' => 'Used', 'images' => ['https://images.unsplash.com/photo-1589003077984-894e133dabab?w=600&h=400&fit=crop']],
        ],
        'Books' => [
            ['title' => 'Atomic Habits by James Clear', 'price' => 14.99, 'condition' => 'Like New', 'images' => ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=400&fit=crop']],
            ['title' => 'The Great Gatsby by F. Scott Fitzgerald', 'price' => 8.50, 'condition' => 'Good', 'images' => ['https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&h=400&fit=crop']],
            ['title' => 'Clean Code by Robert C. Martin', 'price' => 22.00, 'condition' => 'New', 'images' => ['https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&h=400&fit=crop']],
            ['title' => 'Dune by Frank Herbert', 'price' => 12.99, 'condition' => 'Used', 'images' => ['https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=400&fit=crop']],
        ],
        'Clothing' => [
            ['title' => 'Levi\'s 501 Original Fit Jeans', 'price' => 45.00, 'condition' => 'Like New', 'images' => ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=400&fit=crop']],
            ['title' => 'Nike Air Max 270 Running Shoes', 'price' => 89.99, 'condition' => 'New', 'images' => ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop']],
            ['title' => 'The North Face Puffer Jacket', 'price' => 120.00, 'condition' => 'Good', 'images' => ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=400&fit=crop']],
            ['title' => 'Adidas Originals Trefoil Hoodie', 'price' => 55.00, 'condition' => 'Used', 'images' => ['https://images.unsplash.com/photo-1556821840-3a63f7560067?w=600&h=400&fit=crop']],
            ['title' => 'Ray-Ban Aviator Sunglasses', 'price' => 75.00, 'condition' => 'New', 'images' => ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=400&fit=crop']],
        ],
        'Furniture' => [
            ['title' => 'IKEA KALLAX Shelf Unit', 'price' => 69.99, 'condition' => 'Like New', 'images' => ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop']],
            ['title' => 'Herman Miller Aeron Chair', 'price' => 450.00, 'condition' => 'Good', 'images' => ['https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&h=400&fit=crop']],
            ['title' => 'Mid-Century Modern Coffee Table', 'price' => 135.00, 'condition' => 'Used', 'images' => ['https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=600&h=400&fit=crop']],
            ['title' => 'West Elm Velvet Sofa', 'price' => 380.00, 'condition' => 'Good', 'images' => ['https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=600&h=400&fit=crop']],
        ],
        'Sports' => [
            ['title' => 'Spalding NBA Official Basketball', 'price' => 29.99, 'condition' => 'New', 'images' => ['https://images.unsplash.com/photo-1519861531473-9200262188bf?w=600&h=400&fit=crop']],
            ['title' => 'Wilson Pro Staff Tennis Racket', 'price' => 159.00, 'condition' => 'Like New', 'images' => ['https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=600&h=400&fit=crop']],
            ['title' => 'Yeti Rambler 32oz Water Bottle', 'price' => 35.00, 'condition' => 'New', 'images' => ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=400&fit=crop']],
            ['title' => 'Bowflex SelectTech 552 Dumbbells', 'price' => 299.00, 'condition' => 'Good', 'images' => ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop']],
            ['title' => 'Manduka PRO Yoga Mat', 'price' => 75.00, 'condition' => 'Like New', 'images' => ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&h=400&fit=crop']],
            ['title' => 'Schwinn Discover Hybrid Bike', 'price' => 220.00, 'condition' => 'Used', 'images' => ['https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&h=400&fit=crop']],
        ],
        'Toys' => [
            ['title' => 'LEGO Star Wars Millennium Falcon', 'price' => 129.99, 'condition' => 'New', 'images' => ['https://images.unsplash.com/photo-1472586663735-54569ff16a7e?w=600&h=400&fit=crop']],
            ['title' => 'Nintendo Switch OLED Console', 'price' => 299.00, 'condition' => 'Like New', 'images' => ['https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=600&h=400&fit=crop']],
            ['title' => 'Hot Wheels Ultimate Garage Playset', 'price' => 45.00, 'condition' => 'Good', 'images' => ['https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=600&h=400&fit=crop']],
            ['title' => 'Rubik\'s Cube 3x3 Speed Cube', 'price' => 12.99, 'condition' => 'New', 'images' => ['https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=600&h=400&fit=crop']],
        ],
    ];

    public function run(): void
    {
        // Clear all seeded data (order matters due to FK constraints)
        DB::statement('TRUNCATE reviews, orders, payments, alerts, reports, products, users CASCADE');

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

        $sellerIds = $sellers->pluck('id')->push($seller->id);
        $buyerIds = $buyers->pluck('id')->push($buyer->id);

        // 3. Create products with real names and relevant images
        $allProducts = [];
        foreach ($this->products as $category => $items) {
            foreach ($items as $item) {
                $allProducts[] = array_merge($item, ['category' => $category]);
            }
        }

        shuffle($allProducts);

        $sellerIndex = 0;
        foreach ($allProducts as $productData) {
            $sId = $sellerIds[$sellerIndex % $sellerIds->count()];
            $sellerIndex++;

            $product = Product::create([
                'title' => $productData['title'],
                'category' => $productData['category'],
                'condition' => $productData['condition'],
                'price' => $productData['price'],
                'description' => 'High-quality ' . strtolower($productData['condition']) . ' ' . strtolower($productData['title']) . '. Great deal for the price. Contact for more details.',
                'images' => $productData['images'],
                'seller_id' => $sId,
                'status' => 'available',
                'approval_status' => 'approved',
                'stock_quantity' => rand(1, 3),
                'location' => fake()->city(),
                'is_featured' => fake()->boolean(20),
                'views' => rand(5, 200),
            ]);

            // Create reviews for some products
            if (fake()->boolean(60)) {
                $reviewerId = fake()->randomElement($buyerIds);
                $reviewer = User::find($reviewerId);

                Review::create([
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
                        'Item exactly as described in the listing.',
                    ]),
                ]);
            }
        }
    }
}
