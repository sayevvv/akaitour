<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role', // Tambahkan ini
        'is_verified', // Tambahkan ini
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_verified' => 'boolean'
        ];
    }

    // --- RELASI ELOQUENT ---

    /**
     * Seorang user (admin) bisa membuat banyak turnamen.
     */
    public function tournaments(): HasMany
    {
        return $this->hasMany(Tournament::class, 'created_by');
    }

    /**
     * Seorang user (juri) bisa menilai banyak pertandingan.
     */
    public function judgedMatches()
    {
        return $this->belongsToMany(MatchModel::class, 'match_juri', 'juri_id', 'match_id');
    }

    /**
     * Seorang user (juri) bisa memberikan banyak skor.
     */
    public function scores(): HasMany
    {
        return $this->hasMany(Score::class, 'juri_id');
    }
}
