<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Gender;
use App\Models\Student;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        Gender::factory()->create([
            'gender' => 'Male'
        ]);

        Gender::factory()->create([
            'gender' => 'Female'
        ]);

        Gender::factory()->create([
            'gender' => 'Others'
        ]);

        Student::factory(300)->create();
    }
}
