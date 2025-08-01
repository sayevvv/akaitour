<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Score extends Model
{
    use HasFactory;
    public $timestamps = false; // Hanya ada created_at
    protected $fillable = ['match_id', 'juri_id', 'player_id', 'score_value'];

    public function juri(): BelongsTo
    {
        return $this->belongsTo(User::class, 'juri_id');
    }
}
