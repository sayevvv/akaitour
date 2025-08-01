<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Inertia\Response as InertiaResponse;

class UserController extends Controller
{
    public function index(): InertiaResponse // 2. Gunakan tipe yang benar di sini
    {
        $unverifiedUsers = User::where('is_verified', false)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('admin/users/verify', [
            'users' => $unverifiedUsers,
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
