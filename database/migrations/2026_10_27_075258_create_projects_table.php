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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('number', 10)->nullable();
            $table->string('title');
            $table->string('category')->default('Web Engineering');
            $table->string('badge')->nullable();
            $table->string('period')->nullable();
            $table->string('client')->nullable();
            $table->text('summary')->nullable();
            $table->string('role')->nullable();
            $table->json('contributions')->nullable();
            $table->json('metrics')->nullable();
            $table->json('technologies')->nullable();
            $table->json('features')->nullable();
            $table->text('testingMethodology')->nullable();
            $table->json('testingResults')->nullable();
            $table->json('starMethod')->nullable();
            $table->json('layerImages')->nullable();
            $table->string('githubUrl')->nullable();
            $table->string('liveUrl')->nullable();
            $table->string('figmaUrl')->nullable();
            $table->string('docUrl')->nullable();
            $table->boolean('featured')->default(true);
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
