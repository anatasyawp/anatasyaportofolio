<?php

use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

// Main Portfolio Page (injected with projects from DB)
Route::get('/', [ProjectController::class, 'index'])->name('home');

// RESTful CRUD Endpoints for Projects
Route::prefix('api/projects')->name('api.projects.')->group(function () {
    Route::get('/', [ProjectController::class, 'index'])->name('index');
    Route::post('/', [ProjectController::class, 'store'])->name('store');
    Route::get('/{project}', [ProjectController::class, 'show'])->name('show');
    Route::put('/{project}', [ProjectController::class, 'update'])->name('update');
    Route::patch('/{project}', [ProjectController::class, 'update'])->name('patch');
    Route::delete('/{project}', [ProjectController::class, 'destroy'])->name('destroy');
});

