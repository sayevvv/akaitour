<?php

namespace App\Http\Controllers\Admin;

use App\Models\Player;
use App\Models\Tournament;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PlayerController extends Controller
{
    public function store(Request $request, Tournament $tournament)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'nickname' => 'nullable|string|max:100',
            'origin' => 'nullable|string|max:255', // Tambahkan validasi untuk origin
        ]);

        if ($tournament->players()->count() >= 32) {
            return back()->withErrors(['limit' => 'Jumlah pemain sudah mencapai batas maksimal (32).']);
        }

        $player = Player::create($validated);
        $tournament->players()->attach($player->id);

        return back()->with('success', 'Pemain berhasil ditambahkan.');
    }
}
