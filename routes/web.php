<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MatchController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\PlayerController;
use App\Http\Controllers\Admin\TournamentController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/register/pending', function () {
    return Inertia::render('auth/pending-verification');
})->name('auth.pending');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
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

Route::middleware(['auth', 'role:admin,master_admin'])->prefix('admin')->name('admin.')->group(function () {
    // Rute Turnamen
    Route::get('/tournaments/create', [TournamentController::class, 'create'])->name('tournaments.create');
    Route::post('/tournaments', [TournamentController::class, 'store'])->name('tournaments.store');
    Route::get('/tournaments/{tournament}/manage', [TournamentController::class, 'manage'])->name('tournaments.manage');

    // Rute untuk menambah pemain ke turnamen
    Route::post('/tournaments/{tournament}/players', [PlayerController::class, 'store'])->name('tournaments.players.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
