<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ReimbursementController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::middleware('auth')->group(function () {
    Route::controller(HomeController::class)->name('home.')->group(function () {
        Route::get('/', 'index')->name('index');
    });

    Route::controller(ReimbursementController::class)->name('reimbursement.')->prefix('reimbursement')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::get('/{id}', 'show')->name('show');
        Route::get('/{id}/file', 'getFile')->name('get_file');
        Route::post('/', 'store')->name('store');
        Route::post('/{id}/status/{status}', 'updateStatus')->name('update_status');

        // Route::put('/{id}', 'update')->name('update');
        Route::delete('/{id}', 'destroy')->name('destroy');
    });

    Route::controller(UserController::class)->name('users.')->prefix('users')->middleware('role:DIREKTUR')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::get('/{id}', 'edit')->name('edit');
        Route::post('/', 'store')->name('store');
        Route::put('/{id}', 'update')->name('update');
        Route::put('/{id}/change-password', 'updatePassword')->name('update_password');
        Route::delete('/{id}', 'destroy')->name('destroy');
    });
});

Route::controller(AuthController::class)->name('auth.')->group(function () {
    Route::get('/login', 'index')->name('login.index');
    Route::post('/login', 'login')->name('login.action');
    Route::post('/logout', 'logout')->name('logout.action');
});
