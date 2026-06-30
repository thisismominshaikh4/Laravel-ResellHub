<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('products')
            ->where('title', 'Adidas Originals Trefoil Hoodie')
            ->update(['images' => ['https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=400&fit=crop']]);
    }

    public function down(): void
    {
        DB::table('products')
            ->where('title', 'Adidas Originals Trefoil Hoodie')
            ->update(['images' => ['https://images.unsplash.com/photo-1556821840-3a63f7560067?w=600&h=400&fit=crop']]);
    }
};
