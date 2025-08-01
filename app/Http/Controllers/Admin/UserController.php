<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    public function index(): Response
    {
        $unverifiedUsers = User::where('is_verified', false)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('admin/users/verify', [
            'users' => $unverifiedUsers
        ]);
    }

    /**
     * Memverifikasi seorang pengguna.
     */
    public function verify(User $user): RedirectResponse
    {
        $user->update(['is_verified' => true]);

        return redirect()->back()->with('success', 'User berhasil diverifikasi.');
    }
}
