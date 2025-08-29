<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicPageController;
use App\Http\Controllers\FormSubmissionController;
use App\Http\Controllers\SitemapController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Routes
Route::get('/sitemap.xml', [SitemapController::class, 'generate'])->name('sitemap');
Route::post('/forms/{form}/submit', [FormSubmissionController::class, 'store'])->name('forms.submit');

// Newsletter subscription
Route::post('/subscribe', [FormSubmissionController::class, 'subscribe'])->name('subscribe');
Route::get('/unsubscribe/{token}', [FormSubmissionController::class, 'unsubscribe'])->name('unsubscribe');

// Admin Routes
require __DIR__.'/admin.php';

// Auth Routes
require __DIR__.'/auth.php';

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Catch-all route for dynamic pages (must be last)
Route::get('/{slug?}', [PublicPageController::class, 'show'])->where('slug', '.*')->name('public.page');
