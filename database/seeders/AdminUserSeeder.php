<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create default admin user
        User::updateOrCreate(
            ['email' => 'admin@gdca.com'],
            [
                'name' => 'Admin User',
                'email' => 'admin@gdca.com',
                'password' => Hash::make('password123'),
                'role' => 'admin',
                'email_verified_at' => now(),
            ]
        );

        // Create default editor user
        User::updateOrCreate(
            ['email' => 'editor@gdca.com'],
            [
                'name' => 'Editor User',
                'email' => 'editor@gdca.com',
                'password' => Hash::make('password123'),
                'role' => 'editor',
                'email_verified_at' => now(),
            ]
        );
    }
}
