<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\TournamentController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'role:admin,master_admin'])->group(function () {
    Route::get('/tournaments', [TournamentController::class, 'index'])->name('tournaments.index');
    // Letakkan semua route yang hanya bisa diakses admin di sini
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
