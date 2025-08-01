<?php

namespace App\Models;

use App\Models\User;
use App\Models\Player;
use App\Models\MatchModel;
use App\Models\TournamentType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tournament extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'description', 'tournament_type_id', 'created_by', 'start_date', 'end_date', 'status'
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
    ];

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function tournamentType(): BelongsTo
    {
        return $this->belongsTo(TournamentType::class);
    }

    public function players(): BelongsToMany
    {
        return $this->belongsToMany(Player::class, 'tournament_player');
    }

    public function matches(): HasMany
    {
        return $this->hasMany(MatchModel::class);
    }
}
