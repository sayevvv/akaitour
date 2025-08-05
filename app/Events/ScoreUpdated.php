<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ScoreUpdated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    // Jadikan properti ini public agar otomatis terkirim sebagai data event
    public Score $score;

    /**
     * Create a new event instance.
     */
    public function __construct(Score $score)
    {
        $this->score = $score->load('juri'); // Muat relasi juri
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        // Siarkan di channel privat untuk pertandingan ini
        return [
            new PrivateChannel('match.' . $this->score->match_id),
        ];
    }
}
