<?php

namespace Database\Seeders;

use App\Enum\RoleEnum;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $users = [
            [
                'nip'   => '1234',
                'name'  => 'DONI',
                'role'  => RoleEnum::DIREKTUR->value,
            ],
            [
                'nip'   => '1235',
                'name'  => 'DONO',
                'role'  => RoleEnum::FINANCE->value,
            ],
            [
                'nip'   => '1236',
                'name'  => 'DONI',
                'role'  => RoleEnum::STAFF->value,
            ],
        ];

        foreach ($users as $user) {
            \App\Models\User::factory()->create([
                ...$user
            ]);
        }
    }
}
