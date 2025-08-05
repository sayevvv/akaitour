<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MatchController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\TournamentController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/register/pending', function () {
    return Inertia::render('auth/pending-verification');
})->name('auth.pending');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('/matches/{match}', [MatchController::class, 'show'])->name('matches.show');
});

Route::middleware(['auth', 'role:master_admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/users', [UserController::class, 'list'])->name('users.list');
    // Route untuk menampilkan halaman verifikasi pengguna
    Route::get('/users/verify', [UserController::class, 'index'])->name('users.verify.index');
    // Route untuk melakukan aksi verifikasi
    Route::patch('/users/{user}/verify', [UserController::class, 'verify'])->name('users.verify.update');
    Route::delete('/users/{user}/reject', [UserController::class, 'reject'])->name('users.reject');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
