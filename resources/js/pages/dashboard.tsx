import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Swords, PlayCircle } from 'lucide-react';
import { Icon } from '@/components/ui/icon';
import { DashboardStats, Tournament } from '@/types';

// Props untuk halaman Dashboard
interface DashboardProps {
    stats: DashboardStats;
    recentTournaments: Tournament[];
}

export default function Dashboard({ stats, recentTournaments }: DashboardProps) {
    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'ongoing': return 'default';
            case 'completed': return 'outline';
            default: return 'secondary';
        }
    };

    return (
        <AppLayout>
            <Head title="Dashboard" />
            <div className="p-4 sm:p-6 lg:p-8 space-y-8">
                {/* Judul Halaman */}
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Dashboard Admin</h1>
                    <p className="text-muted-foreground">Ringkasan aktivitas turnamen Anda.</p>
                </div>

                {/* Bento Grid untuk Statistik */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Turnamen</CardTitle>
                            <Icon iconNode={Swords} className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_tournaments}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Pemain</CardTitle>
                            <Icon iconNode={Users} className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_players}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Turnamen Berlangsung</CardTitle>
                            <Icon iconNode={PlayCircle} className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.ongoing_tournaments}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabel Turnamen Terbaru */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Turnamen Terbaru</CardTitle>
                            <CardDescription>Berikut adalah 5 turnamen yang terakhir dibuat.</CardDescription>
                        </div>
                        <Button asChild size="sm">
                            <Link href={route('admin.tournaments.create')}>Buat Turnamen Baru</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama Turnamen</TableHead>
                                    <TableHead className="text-center">Status</TableHead>
                                    <TableHead className="text-center">Jumlah Pemain</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentTournaments.length > 0 ? (
                                    recentTournaments.map((tournament) => (
                                        <TableRow key={tournament.id}>
                                            <TableCell className="font-medium">{tournament.name}</TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant={getStatusVariant(tournament.status)}>
                                                    {tournament.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-center">{tournament.players_count}</TableCell>
                                            <TableCell className="text-right">
                                                <Button asChild variant="outline" size="sm">
                                                    <Link href={route('admin.tournaments.manage', tournament.id)}>
                                                        Kelola
                                                        <Icon iconNode={ArrowRight} className="ml-2 h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center h-24">
                                            Belum ada turnamen yang dibuat.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
