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
        Schema::create('tbl_users', function (Blueprint $table) {
            $table->id('user_id');
            $table->string('name', 55);
            $table->integer('age');
            $table->unsignedBigInteger('gender_id');
            $table->date('birth_date');
            $table->string('username', 55);
            $table->string('password', 255);
            $table->timestamps();

            $table->foreign('gender_id')->references('gender_id')->on('tbl_genders')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_users');
    }
};
