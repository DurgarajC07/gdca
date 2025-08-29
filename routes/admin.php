<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\MenuItemController;
use App\Http\Controllers\Admin\SiteSettingController;
use App\Http\Controllers\Admin\FormController;
use App\Http\Controllers\Admin\FormSubmissionController;
use App\Http\Controllers\Admin\HomeSectionController;
use App\Http\Controllers\Admin\PortfolioController;
use App\Http\Controllers\Admin\MediaController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
|
| Here is where you can register admin routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group and require authentication.
|
*/

Route::middleware(['auth', 'editor'])->prefix('admin')->name('admin.')->group(function () {
    
    // Admin Dashboard
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    
    // Pages Management (Editor access)
    Route::resource('pages', PageController::class);
    
    // Menu Items Management (Editor access)
    Route::resource('menu-items', MenuItemController::class);
    
    // Forms Management (Editor access)
    Route::resource('forms', FormController::class);
    Route::get('forms/{form}/export', [FormController::class, 'export'])->name('forms.export');
    
    // Form Submissions
    Route::delete('form-submissions/{submission}', [FormSubmissionController::class, 'destroy'])
        ->name('form-submissions.destroy');
    
    // Homepage Sections Management (Editor access)
    Route::resource('home-sections', HomeSectionController::class);
    
    // Portfolio Management (Editor access)
    Route::resource('portfolio', PortfolioController::class);
    
    // Media Library (Editor access)
    Route::resource('media', MediaController::class)->except(['create', 'edit']);
    Route::post('media/bulk-delete', [MediaController::class, 'bulkDelete'])->name('media.bulk-delete');
    Route::get('media-select', [MediaController::class, 'select'])->name('media.select');
    
});

// Admin-only routes
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    
    // Site Settings (Admin only)
    Route::get('site-settings', [SiteSettingController::class, 'index'])->name('site-settings.index');
    Route::post('site-settings', [SiteSettingController::class, 'update'])->name('site-settings.update');
    
});
