<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
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
    public function verify(Request $request, User $user): RedirectResponse // <-- 2. Tambahkan Request $request
    {
        // 3. Validasi input peran dari frontend
        $validated = $request->validate([
            'role' => ['required', 'string', Rule::in(['admin', 'juri', 'orang_layar'])],
        ]);

        // 4. Update user dengan status verifikasi dan peran yang baru
        $user->update([
            'is_verified' => true,
            'role' => $validated['role'], // Simpan peran yang dipilih
        ]);

        return redirect()->back()->with('success', 'User berhasil diterima sebagai ' . $validated['role']);
    }

    /**
     * Menolak dan menghapus pendaftaran pengguna.
     */
    public function reject(User $user): RedirectResponse
    {
        // Tambahan keamanan: pastikan tidak bisa menolak diri sendiri atau user yang sudah terverifikasi
        if ($user->id === auth()->id() || $user->is_verified) {
            return redirect()->back()->with('error', 'Aksi tidak diizinkan.');
        }

        $user->delete();

        return redirect()->back()->with('success', 'Pendaftaran pengguna berhasil ditolak.');
    }

    public function list(): InertiaResponse
    {
        $users = User::where('id', '!=', auth()->id()) // Jangan tampilkan diri sendiri
            ->orderBy('name')
            ->get();

        return Inertia::render('admin/users/list', [
            'users' => $users
        ]);
    }
}
