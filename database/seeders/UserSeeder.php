<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'masteradmin@example.com'], // Kunci unik untuk mencari
            [
                'name' => 'Master Admin',
                'password' => Hash::make('password'), // Ganti dengan password yang aman
                'role' => 'master_admin',
                'is_verified' => true,
                'email_verified_at' => now(),
            ]
        );
    }
}
