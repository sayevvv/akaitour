<?php

namespace App\Http\Controllers;

use Inertia\Response;
use Inertia\Inertia;
use App\Models\MatchModel;
use Illuminate\Http\Request;

class MatchController extends Controller
{
     public function show(MatchModel $match): Response
    {
        // Muat semua relasi yang dibutuhkan oleh frontend
        $match->load([
            'player1',
            'player2',
            'scores.juri' // Muat relasi juri dari skor
        ]);

        return Inertia::render('matches/show', [
            'match' => $match,
            // TAMBAHKAN DATA DEBUG INI
            'debug' => [
                'match_with_relations' => $match->toArray(),
            ]
        ]);
    }
}
