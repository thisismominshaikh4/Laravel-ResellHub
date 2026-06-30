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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->string('product_title');
            $table->string('product_image')->nullable();
            $table->foreignId('buyer_id')->constrained('users')->onDelete('cascade');
            $table->string('buyer_name');
            $table->string('buyer_email');
            $table->string('buyer_phone')->nullable();
            $table->string('buyer_address')->nullable();
            $table->foreignId('seller_id')->constrained('users')->onDelete('cascade');
            $table->string('seller_name');
            $table->string('seller_email');
            $table->decimal('price', 10, 2);
            $table->integer('quantity')->default(1);
            $table->enum('order_status', ['pending', 'accepted', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'])->default('pending');
            $table->enum('payment_method', ['stripe', 'card', 'cod', 'bkash'])->default('stripe');
            $table->enum('payment_status', ['pending', 'paid', 'failed', 'refunded'])->default('pending');
            $table->string('transaction_id')->nullable();
            $table->string('delivery_address')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
