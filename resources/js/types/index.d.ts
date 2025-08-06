import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

declare global {
    interface Window {
        Echo: Echo;
        Pusher: typeof Pusher;
    }
}

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'master_admin' | 'admin' | 'juri' | 'orang_layar';
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Player {
    id: number;
    name: string;
    nickname: string | null;
    team_name: string | null;
    photo_url: string | null;
    origin: string | null;
}

// Interface for a Score, including the Juri relationship
export interface Score {
    id: number;
    match_id: number;
    player_id: number;
    juri_id: number;
    score_value: number;
    juri: User; // The Juri who gave the score
}

// Interface for a Match, including all its relationships
export interface Match {
    id: number;
    tournament_id: number;
    player1_id: number;
    player2_id: number;
    winner_id: number | null;
    player1: Player; // Player 1 object
    player2: Player; // Player 2 object
    scores: Score[]; // An array of scores
    status: 'pending' | 'ready' | 'ongoing' | 'completed' | 'disputed';
}

// Defines the shared data available on all pages
export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
}

export interface Tournament {
    id: number;
    name: string;
    description: string | null;
    status: 'draft' | 'published' | 'ongoing' | 'completed' | 'archived';
    players_count?: number; // Tambahkan ini (opsional)
    players?: Player[]; // Ubah menjadi opsional
}

export interface DashboardStats {
    total_tournaments: number;
    total_players: number;
    ongoing_tournaments: number;
}

// This is the generic PageProps for your application
export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & SharedData;
