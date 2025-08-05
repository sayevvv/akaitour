<?php

namespace App\Http\Controllers\Api;

use App\Models\Score;
use App\Events\ScoreUpdated;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ScoreController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'match_id' => 'required|exists:matches,id',
            'player_id' => 'required|exists:players,id',
            'score_value' => 'required|numeric|min:0',
        ]);

        // Buat atau perbarui skor
        $score = Score::updateOrCreate(
            [
                'match_id' => $validated['match_id'],
                'player_id' => $validated['player_id'],
                'juri_id' => Auth::id(),
            ],
            ['score_value' => $validated['score_value']]
        );

        // Siarkan event ke semua yang mendengarkan di channel ini
        ScoreUpdated::dispatch($score);

        return response()->json($score->load('juri'));
    }
}
