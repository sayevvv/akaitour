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
            'scores' => function ($query) {
                $query->with('juri')->orderBy('juri_id');
            }
        ]);

        return Inertia::render('matches/show', [
            'match' => $match,
        ]);
    }
}
