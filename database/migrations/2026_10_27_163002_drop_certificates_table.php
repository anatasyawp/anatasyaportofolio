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
        Schema::dropIfExists('certificates');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::create('certificates', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('issuer');
            $table->string('issueDate')->nullable();
            $table->string('credentialId')->nullable();
            $table->string('credentialUrl')->nullable();
            $table->string('association')->nullable();
            $table->string('category')->default('Certification');
            $table->text('description')->nullable();
            $table->json('skills')->nullable();
            $table->string('type')->default('certification');
            $table->string('badge')->nullable();
            $table->string('image')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }
};
