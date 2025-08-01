<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("CREATE TYPE match_status AS ENUM ('pending', 'ready', 'ongoing', 'completed', 'disputed')");

        Schema::create('matches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tournament_id')->constrained()->onDelete('cascade');
            $table->smallInteger('round_number');
            $table->smallInteger('match_number_in_round');

            $table->foreignId('player1_id')->nullable()->constrained('players')->onDelete('set null');
            $table->foreignId('player2_id')->nullable()->constrained('players')->onDelete('set null');
            $table->foreignId('winner_id')->nullable()->constrained('players')->onDelete('set null');

            $table->foreignId('next_match_id')->nullable()->constrained('matches')->onDelete('set null');

            $table->enum('status', ['pending', 'ready', 'ongoing', 'completed', 'disputed'])->default('pending');
            $table->timestamp('scheduled_time')->nullable();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('ended_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
     public function down(): void
    {
        Schema::dropIfExists('matches');
        DB::statement('DROP TYPE IF EXISTS match_status');
    }
};
