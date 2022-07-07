<?php

namespace Database\Seeders;

use App\Models\AdminUser;
use App\Models\Post;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
         \App\Models\User::factory(10)->create();

         Post::factory(10)->create();

         AdminUser::factory(1)->create([
             "name" => "Admin2",
             "email" => "admin@admin.com",
             "password" => bcrypt(12345)
         ]);

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
