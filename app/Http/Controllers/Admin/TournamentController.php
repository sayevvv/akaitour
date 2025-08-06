<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Tournament;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class TournamentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('admin/tournaments/create');
    }

    /**
     * Store a newly created resource in storage.
     */
     public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $tournament = Tournament::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'created_by' => Auth::id(),
            'tournament_type_id' => 1, // Default type
            'status' => 'draft',
        ]);

        // Alihkan ke halaman manajemen pemain untuk turnamen ini
        return redirect()->route('admin.tournaments.manage', $tournament);
    }

    public function manage(Tournament $tournament): Response
    {
        // Muat relasi pemain untuk ditampilkan
        $tournament->load('players');

        return Inertia::render('admin/tournaments/manage', [
            'tournament' => $tournament
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Tournament $tournament)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tournament $tournament)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tournament $tournament)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tournament $tournament)
    {
        //
    }
}
