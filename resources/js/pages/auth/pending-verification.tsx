import { Link, Head } from '@inertiajs/react';
import AuthCardLayout from '@/layouts/auth/auth-card-layout';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { MailCheck } from 'lucide-react'; // <-- 1. Impor ikon

export default function PendingVerification() {
    return (
        <AuthCardLayout>
            <Head title='Pendaftaran Berhasil' />

            <div className='flex flex-col items-center justify-center text-center'>
                <div className='mb-4 flex size-14 items-center justify-center rounded-full bg-green-100'>
                    {/* 2. Gunakan prop iconNode */}
                    <Icon iconNode={MailCheck} className='size-8 text-green-600' />
                </div>

                <h2 className='mb-2 text-xl font-semibold'>Pendaftaran Berhasil!</h2>
                <p className='text-muted-foreground'>
                    Akun Anda telah berhasil dibuat. Mohon tunggu verifikasi dari Admin untuk dapat
                    login ke dalam sistem.
                </p>

                <Button asChild className='mt-6 w-full'>
                    <Link href={route('login')}>Kembali ke Halaman Login</Link>
                </Button>
            </div>
        </AuthCardLayout>
    );
}
