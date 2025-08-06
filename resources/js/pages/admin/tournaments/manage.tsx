import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon'; // Tambahkan Icon
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Player, Tournament } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react'; // Tambahkan Link
import { ArrowLeft } from 'lucide-react'; // Tambahkan ikon
import { useEffect } from 'react';
import { toast } from 'sonner';

interface Props {
    tournament: Tournament & { players: Player[] };
}

export default function ManageTournamentPage({ tournament }: Props) {
    const { data, setData, post, processing, errors, reset, isDirty } = useForm({
        name: '',
        nickname: '',
        origin: '',
        limit: '',
    });

    const isFull = tournament.players.length >= 32;

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isDirty && !processing) {
                e.preventDefault();
                e.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        const inertiaListener = router.on('before', (event) => {
            if (isDirty && !processing) {
                if (!window.confirm('Anda memiliki perubahan yang belum disimpan. Apakah Anda yakin ingin meninggalkan halaman ini?')) {
                    event.preventDefault();
                }
            }
        });
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            inertiaListener();
        };
    }, [isDirty, processing]);

    function submitPlayer(e: React.FormEvent) {
        e.preventDefault();
        post(route('admin.tournaments.players.store', tournament.id), {
            onSuccess: () => {
                toast.success('Pemain berhasil ditambahkan.');
                reset();
            },
        });
    }

    return (
        <AppLayout>
            <Head title={`Kelola Turnamen: ${tournament.name}`} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Kelola Turnamen</h1>
                            <p className="text-muted-foreground">
                                Anda sedang mengelola pemain untuk turnamen:{' '}
                                <span className="font-semibold text-foreground">{tournament.name}</span>
                            </p>
                        </div>
                        <Button asChild variant="outline">
                            <Link href={route('admin.tournaments.create')}>
                                <Icon iconNode={ArrowLeft} className="mr-2 h-4 w-4" />
                                Kembali
                            </Link>
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Kolom Kiri: Tambah Pemain */}
                        <div className="lg:col-span-1">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Tambah Pemain Baru</CardTitle>
                                    {isFull && <CardDescription className="text-red-500">Batas pemain tercapai!</CardDescription>}
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={submitPlayer} className="space-y-4">
                                        <div>
                                            <Label htmlFor="player-name">Nama Lengkap Pemain</Label>
                                            <Input
                                                id="player-name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                disabled={isFull}
                                            />
                                            <InputError message={errors.name} className="mt-1" />
                                        </div>
                                        <div>
                                            <Label htmlFor="player-nickname">Nickname (Opsional)</Label>
                                            <Input
                                                id="player-nickname"
                                                value={data.nickname}
                                                onChange={(e) => setData('nickname', e.target.value)}
                                                disabled={isFull}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="player-origin">Tempat Asal (Opsional)</Label>
                                            <Input
                                                id="player-origin"
                                                value={data.origin}
                                                onChange={(e) => setData('origin', e.target.value)}
                                                disabled={isFull}
                                            />
                                            <InputError message={errors.origin} className="mt-1" />
                                        </div>
                                        <Button type="submit" disabled={processing || isFull} className="w-full">
                                            {processing ? 'Menambahkan...' : 'Tambah Pemain'}
                                        </Button>
                                        <InputError message={errors.limit} className="mt-1 text-center" />
                                    </form>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Kolom Kanan: Daftar Pemain */}
                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Pemain Terdaftar</CardTitle>
                                    <CardDescription>Jumlah pemain: {tournament.players.length} / 32</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>#</TableHead>
                                                <TableHead>Nama</TableHead>
                                                <TableHead>Nickname</TableHead>
                                                <TableHead>Asal</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {tournament.players.map((player, index) => (
                                                <TableRow key={player.id}>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell className="font-medium">{player.name}</TableCell>
                                                    <TableCell>{player.nickname || '-'}</TableCell>
                                                    <TableCell>{player.origin || '-'}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    <div className="mt-6 flex justify-end">
                                        <Button disabled={tournament.players.length < 2}>Generate Bracket</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
