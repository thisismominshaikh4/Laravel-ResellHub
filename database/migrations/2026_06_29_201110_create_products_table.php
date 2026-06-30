<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('category');
            $table->enum('condition', ['New', 'Like New', 'Used', 'Refurbished', 'Good', 'Fair', 'Poor'])->default('Used');
            $table->decimal('price', 10, 2);
            $table->text('description');
            $table->json('images')->nullable();
            $table->foreignId('seller_id')->constrained('users')->onDelete('cascade');
            $table->enum('status', ['available', 'sold', 'pending', 'reported', 'reported_and_removed'])->default('available');
            $table->enum('approval_status', ['pending', 'approved', 'rejected'])->default('approved');
            $table->integer('stock_quantity')->default(1);
            $table->string('location')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->integer('views')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
