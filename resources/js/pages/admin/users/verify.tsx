import AppLayout from '@/layouts/app-layout';
import { User } from '@/types';
import { Head, router } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface Props {
    users: User[];
}

export default function VerifyUsersPage({ users }: Props) {
    const verifyUser = (user: User) => {
        router.patch(route('admin.users.verify.update', user.id), {}, {
            preserveScroll: true, // Agar halaman tidak scroll ke atas setelah aksi
            onSuccess: () => {
                toast.success(`User ${user.name} berhasil diverifikasi.`);
            },
            onError: () => {
                toast.error('Gagal memverifikasi user.');
            }
        });
    };

    return (
        <AppLayout>
            <Head title='Verifikasi Akun' />
            <div className='py-12'>
                <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Verifikasi Akun Baru</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Peran</TableHead>
                                        <TableHead>Tanggal Daftar</TableHead>
                                        <TableHead className='text-right'>Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.length > 0 ? (
                                        users.map((user) => (
                                            <TableRow key={user.id}>
                                                <TableCell className='font-medium'>{user.name}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>
                                                    <Badge variant='secondary'>{user.role}</Badge>
                                                </TableCell>
                                                 <TableCell>
                                                    {new Date(user.created_at).toLocaleDateString('id-ID')}
                                                </TableCell>
                                                <TableCell className='text-right'>
                                                    <Button
                                                        size='sm'
                                                        onClick={() => verifyUser(user)}
                                                    >
                                                        Verifikasi
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={5} className='text-center'>
                                                Tidak ada akun yang perlu diverifikasi.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
