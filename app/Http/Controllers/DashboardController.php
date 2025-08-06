<?php

namespace App\Http\Controllers;

use App\Models\Player;
use App\Models\Tournament;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        // Ambil data statistik
        $stats = [
            'total_tournaments' => Tournament::count(),
            'total_players' => Player::count(),
            'ongoing_tournaments' => Tournament::where('status', 'ongoing')->count(),
        ];

        // Ambil 5 turnamen terbaru
        $recentTournaments = Tournament::withCount('players') // Menghitung jumlah pemain
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentTournaments' => $recentTournaments,
        ]);
    }
}
