import AppLayout from '@/layouts/app-layout';
import { User } from '@/types';
import { Head } from '@inertiajs/react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { CheckCircle, XCircle } from 'lucide-react';

interface Props {
    users: User[];
}

export default function UserListPage({ users }: Props) {
    return (
        <AppLayout>
            <Head title='Daftar Pengguna' />
            <div className='py-12'>
                <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Daftar Semua Pengguna</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Peran</TableHead>
                                        <TableHead className='text-center'>Status Verifikasi</TableHead>
                                        <TableHead>Tanggal Daftar</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.length > 0 ? (
                                        users.map((user) => (
                                            <TableRow key={user.id}>
                                                <TableCell className='font-medium'>{user.name}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>
                                                    <Badge variant='outline'>{user.role}</Badge>
                                                </TableCell>
                                                <TableCell className='text-center'>
                                                    {user.is_verified ? (
                                                        <Badge variant='default' className='bg-green-600 hover:bg-green-700'>
                                                            <Icon iconNode={CheckCircle} className='mr-1 size-4' />
                                                            Terverifikasi
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant='destructive'>
                                                            <Icon iconNode={XCircle} className='mr-1 size-4' />
                                                            Belum Diverifikasi
                                                        </Badge>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {new Date(user.created_at).toLocaleDateString('id-ID')}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={5} className='text-center'>
                                                Tidak ada pengguna lain di sistem.
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
