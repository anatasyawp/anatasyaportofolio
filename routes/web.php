<?php

use App\Http\Controllers\AchievementController;
use App\Http\Controllers\LicenseController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

// Main Portfolio Page (injected with projects, licenses, and achievements from DB)
Route::get('/', [ProjectController::class, 'index'])->name('home');

// RESTful CRUD Endpoints for Projects
Route::prefix('api/projects')->name('api.projects.')->group(function () {
    Route::get('/', [ProjectController::class, 'index'])->name('index');
    Route::get('/{project}', [ProjectController::class, 'show'])->name('show');
    Route::middleware('portfolio.admin')->group(function () {
        Route::post('/', [ProjectController::class, 'store'])->name('store');
        Route::put('/{project}', [ProjectController::class, 'update'])->name('update');
        Route::patch('/{project}', [ProjectController::class, 'update'])->name('patch');
        Route::delete('/{project}', [ProjectController::class, 'destroy'])->name('destroy');
    });
});

// RESTful CRUD Endpoints for Licenses
Route::prefix('api/licenses')->name('api.licenses.')->group(function () {
    Route::get('/', [LicenseController::class, 'index'])->name('index');
    Route::get('/{license}', [LicenseController::class, 'show'])->name('show');
    Route::middleware('portfolio.admin')->group(function () {
        Route::post('/', [LicenseController::class, 'store'])->name('store');
        Route::put('/{license}', [LicenseController::class, 'update'])->name('update');
        Route::patch('/{license}', [LicenseController::class, 'update'])->name('patch');
        Route::delete('/{license}', [LicenseController::class, 'destroy'])->name('destroy');
    });
});

// RESTful CRUD Endpoints for Achievements
Route::prefix('api/achievements')->name('api.achievements.')->group(function () {
    Route::get('/', [AchievementController::class, 'index'])->name('index');
    Route::get('/{achievement}', [AchievementController::class, 'show'])->name('show');
    Route::middleware('portfolio.admin')->group(function () {
        Route::post('/', [AchievementController::class, 'store'])->name('store');
        Route::put('/{achievement}', [AchievementController::class, 'update'])->name('update');
        Route::patch('/{achievement}', [AchievementController::class, 'update'])->name('patch');
        Route::delete('/{achievement}', [AchievementController::class, 'destroy'])->name('destroy');
    });
});

// Admin Management Dashboard for Projects
Route::middleware('portfolio.admin')->group(function () {
Route::get('/admin/projects', function () {
    $projects = \App\Models\Project::orderBy('order', 'asc')->orderBy('id', 'asc')->get();
    return \Inertia\Inertia::render('AdminProjects', [
        'projects' => $projects
    ]);
})->name('admin.projects');

// Admin Management Dashboard for Licenses
Route::get('/admin/licenses', function () {
    $licenses = \App\Models\License::orderBy('order', 'asc')->orderBy('id', 'asc')->get();
    return \Inertia\Inertia::render('AdminLicenses', [
        'licenses' => $licenses
    ]);
})->name('admin.licenses');

// Admin Management Dashboard for Achievements
Route::get('/admin/achievements', function () {
    $achievements = \App\Models\Achievement::orderBy('order', 'asc')->orderBy('id', 'asc')->get();
    return \Inertia\Inertia::render('AdminAchievements', [
        'achievements' => $achievements
    ]);
})->name('admin.achievements');
});
