<?php

use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Auth;

Broadcast::channel('match.{matchId}', function ($user, $matchId) {
    // Izinkan semua user yang sudah login untuk mendengarkan channel pertandingan.
    // Untuk keamanan lebih, Anda bisa menambahkan logika spesifik di sini,
    // misalnya hanya juri atau orang layar yang terdaftar di turnamen tersebut.
    return Auth::check();
});
