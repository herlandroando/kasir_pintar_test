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
        Schema::create('reimbursement_files', function (Blueprint $table) {
            $table->uuid()->primary();
            $table->string('name');
            // $table->string('uniqname');
            $table->string('extension');
            $table->unsignedInteger('size')->default(0);
            $table->unsignedBigInteger('reimbursement_id');
            $table->timestamps();
            $table->foreign('reimbursement_id')->references('id')->on('reimbursements');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reimbursement_files');
    }
};
