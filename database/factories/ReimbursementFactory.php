<?php

namespace Database\Factories;

use App\Models\Reimbursement;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Enum\ReimbursementStatusEnum;
use App\Models\ReimbursementLog;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reimbursement>
 */
class ReimbursementFactory extends Factory
{

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $created_at = fake()->dateTimeBetween('-7 days');
        $updated_at = fake()->dateTimeBetween($created_at);
        return [
            'name' => fake()->sentence(3),
            'description' => fake()->paragraph(),
            'status' => fake()->randomElement(array_map(fn ($val) => $val->value, ReimbursementStatusEnum::cases())),
            'created_by' => 3,
            'created_at' => $created_at,
            'updated_at' => $updated_at,
        ];
    }

    public function configure(): static
    {
        return $this->afterCreating(function (Reimbursement $reimbursement) {
            $last_updated   = $reimbursement->updated_at;
            $status         = $reimbursement->status;
            if (in_array($status, [ReimbursementStatusEnum::DIRECTOR_APPROVED, ReimbursementStatusEnum::FINANCE_APPROVED])) {
                ReimbursementLog::factory()->create([
                    'description' => '(::DRCT_APPR::)',
                    'reimbursement_id' => $reimbursement->id,
                    'created_by' => 1,
                    'created_at' => $status == ReimbursementStatusEnum::DIRECTOR_APPROVED
                        ? $last_updated
                        : fake()->dateTimeBetween($reimbursement->created_at, $last_updated),
                ]);
            }
            if ($status === ReimbursementStatusEnum::FINANCE_APPROVED) {
                ReimbursementLog::factory()->create([
                    'description' => '(::FNC_APPR::)',
                    'reimbursement_id' => $reimbursement->id,
                    'created_by' => 2,
                    'created_at' => $last_updated,
                ]);
            }
            if ($status === ReimbursementStatusEnum::DECLINED) {
                ReimbursementLog::factory()->create([
                    'description' => '(::DCLD::) ' . fake()->sentence(4),
                    'reimbursement_id' => $reimbursement->id,
                    'created_by' => 1,
                    'created_at' =>  $last_updated
                ]);
            }
        });
    }
}
