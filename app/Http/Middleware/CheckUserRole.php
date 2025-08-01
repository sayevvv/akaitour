<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckUserRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        if (!Auth::check()) {
            return redirect('login');
        }

        $user = Auth::user();

        // Cek jika peran user ada di dalam daftar peran yang diizinkan
        if (in_array($user->role, $roles)) {
            // Tambahan: Pastikan user terverifikasi jika bukan master admin
            if ($user->role !== 'master_admin' && !$user->is_verified) {
                 abort(403, 'AKUN ANDA BELUM DIVERIFIKASI.');
            }
            return $next($request);
        }

        abort(403, 'ANDA TIDAK MEMILIKI AKSES KE HALAMAN INI.');
    }
}
