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
        Schema::create('reimbursements', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255);
            $table->string('description', 500)->nullable();
            $table->string('status')->nullable()->comment("PENDING,DIRECTOR_APPROVED,FINANCE_APPROVED,DECLINED");
            $table->unsignedBigInteger('created_by')->nullable();
            // $table->unsignedBigInteger('last_updated_by')
            $table->timestamps();
            $table->foreign('created_by')->references('id')->on('users')->nullOnDelete();
            // $table->foreign()
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reimbursements');
    }
};
