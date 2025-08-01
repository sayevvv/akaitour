<?php

namespace App\Models;

use App\Models\Score;
use App\Models\Player;
use App\Models\Tournament;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MatchModel extends Model
{
    use HasFactory;

    protected $table = 'matches'; // Eksplisit agar jelas

    protected $fillable = [
        'tournament_id', 'round_number', 'match_number_in_round', 'player1_id',
        'player2_id', 'winner_id', 'next_match_id', 'status', 'scheduled_time'
    ];

    protected $casts = [
        'scheduled_time' => 'datetime',
        'started_at' => 'datetime',
        'ended_at' => 'datetime',
    ];

    public function tournament(): BelongsTo
    {
        return $this->belongsTo(Tournament::class);
    }

    public function player1(): BelongsTo
    {
        return $this->belongsTo(Player::class, 'player1_id');
    }

    public function player2(): BelongsTo
    {
        return $this->belongsTo(Player::class, 'player2_id');
    }

    public function winner(): BelongsTo
    {
        return $this->belongsTo(Player::class, 'winner_id');
    }

    public function scores(): HasMany
    {
        return $this->hasMany(Score::class);
    }
}
