<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

return new class extends Migration
{
    public function up(): void
    {
        $now = now();

        $emails = [
            'admin@resellhub.com',
            'nusrat.seller@resellhub.com',
            'rafiqul.seller@resellhub.com',
            'tahmina.seller@resellhub.com',
            'rakib.hasan@gmail.com',
            'sadia.buyer@gmail.com',
        ];

        $oldIds = DB::table('users')->whereIn('email', $emails)->pluck('id');
        DB::table('reviews')->whereIn('reviewer_id', $oldIds)->delete();
        DB::table('products')->whereIn('seller_id', $oldIds)->delete();
        DB::table('users')->whereIn('email', $emails)->delete();

        $users = [
            ['name' => 'Platform Admin', 'email' => 'admin@resellhub.com', 'password' => Hash::make('admin123'), 'role' => 'admin', 'phone' => '+8801700000000', 'location' => 'Dhaka, Bangladesh', 'photo' => 'https://i.pravatar.cc/300?img=15', 'is_verified' => true, 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Nusrat Jahan', 'email' => 'nusrat.seller@resellhub.com', 'password' => Hash::make('seller123'), 'role' => 'seller', 'phone' => '+8801711111111', 'location' => 'Dhaka, Bangladesh', 'photo' => 'https://i.pravatar.cc/300?img=5', 'is_verified' => true, 'status' => 'active', 'created_at' => $now, 'updated_at' => $now, 'email_verified_at' => $now],
            ['name' => 'Rafiqul Islam', 'email' => 'rafiqul.seller@resellhub.com', 'password' => Hash::make('seller123'), 'role' => 'seller', 'phone' => '+8801722222222', 'location' => 'Chittagong, Bangladesh', 'photo' => 'https://i.pravatar.cc/300?img=12', 'is_verified' => true, 'status' => 'active', 'created_at' => $now, 'updated_at' => $now, 'email_verified_at' => $now],
            ['name' => 'Tahmina Akter', 'email' => 'tahmina.seller@resellhub.com', 'password' => Hash::make('seller123'), 'role' => 'seller', 'phone' => '+8801733333333', 'location' => 'Sylhet, Bangladesh', 'photo' => 'https://i.pravatar.cc/300?img=9', 'is_verified' => false, 'status' => 'active', 'created_at' => $now, 'updated_at' => $now, 'email_verified_at' => null],
            ['name' => 'Md. Rakib Hasan', 'email' => 'rakib.hasan@gmail.com', 'password' => Hash::make('buyer123'), 'role' => 'buyer', 'phone' => '+8801744444444', 'location' => 'Dhaka, Bangladesh', 'photo' => 'https://i.pravatar.cc/300?img=1', 'is_verified' => true, 'status' => 'active', 'created_at' => $now, 'updated_at' => $now, 'email_verified_at' => $now],
            ['name' => 'Sadia Rahman', 'email' => 'sadia.buyer@gmail.com', 'password' => Hash::make('buyer123'), 'role' => 'buyer', 'phone' => '+8801755555555', 'location' => 'Khulna, Bangladesh', 'photo' => 'https://i.pravatar.cc/300?img=20', 'is_verified' => true, 'status' => 'active', 'created_at' => $now, 'updated_at' => $now, 'email_verified_at' => $now],
        ];

        foreach ($users as $user) {
            DB::table('users')->insert($user);
        }
    }

    public function down(): void
    {
        DB::table('users')->whereIn('email', [
            'admin@resellhub.com',
            'nusrat.seller@resellhub.com',
            'rafiqul.seller@resellhub.com',
            'tahmina.seller@resellhub.com',
            'rakib.hasan@gmail.com',
            'sadia.buyer@gmail.com',
        ])->delete();
    }
};
