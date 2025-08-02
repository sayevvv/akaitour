import AppLayout from '@/layouts/app-layout';
import { User } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { Label } from '@/components/ui/label';

interface Props {
    users: User[];
}

export default function VerifyUsersPage({ users }: Props) {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    // 2. State untuk menyimpan peran yang dipilih, default 'juri'
    const [selectedRole, setSelectedRole] = useState<'admin' | 'juri' | 'orang_layar'>('juri');

    // 3. Perbarui fungsi acceptUser untuk mengirim data peran
    const acceptUser = (user: User) => {
        router.patch(
            route('admin.users.verify.update', user.id),
            { role: selectedRole }, // Kirim peran yang dipilih ke backend
            {
                preserveScroll: true,
                onSuccess: () => toast.success(`User ${user.name} berhasil diterima.`),
                onError: (errors) => {
                    if (errors.role) {
                        toast.error(`Gagal: ${errors.role}`);
                    } else {
                        toast.error('Gagal menerima user.');
                    }
                },
                onFinish: () => {
                    setSelectedUser(null);
                    setSelectedRole('juri'); // Reset pilihan peran untuk dialog selanjutnya
                },
            },
        );
    };

    const rejectUser = (user: User) => {
        router.delete(route('admin.users.reject', user.id), {
            preserveScroll: true,
            onSuccess: () => toast.success(`User ${user.name} berhasil ditolak.`),
            onError: () => toast.error('Gagal menolak user.'),
            onFinish: () => setSelectedUser(null),
        });
    };

    const handleActionClick = (user: User) => {
        setSelectedUser(user);
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
                                                    {/* Tombol ini sekarang membuka dialog */}
                                                    <Button size='sm' onClick={() => handleActionClick(user)}>
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
            <AlertDialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Konfirmasi Pendaftaran</AlertDialogTitle>
                        <AlertDialogDescription>
                            Verifikasi pendaftaran untuk user:{' '}
                            <span className='font-bold'>{selectedUser?.name}</span>.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className='space-y-2 py-2'>
                        <Label htmlFor='role-select'>Tetapkan Peran</Label>
                        <Select
                            value={selectedRole}
                            onValueChange={(value) => setSelectedRole(value as any)}
                        >
                            <SelectTrigger id='role-select'>
                                <SelectValue placeholder='Pilih peran...' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='admin'>Admin</SelectItem>
                                <SelectItem value='juri'>Juri</SelectItem>
                                <SelectItem value='orang_layar'>Orang Layar</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <AlertDialogFooter>
                        {/* 2. Tambahkan tombol Batal di sini */}
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <Button
                            variant='destructive'
                            onClick={() => selectedUser && rejectUser(selectedUser)}
                        >
                            Tolak
                        </Button>
                        <Button onClick={() => selectedUser && acceptUser(selectedUser)}>
                            Terima & Tetapkan Peran
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
