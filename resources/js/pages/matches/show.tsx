import AppLayout from '@/layouts/app-layout';
import { PageProps, Match, Score, User } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import axios from 'axios';

// Definisikan tipe untuk skor yang sudah di-grouping
type GroupedScores = {
    [juriId: number]: {
        juriName: string;
        player1Score: number | string;
        player2Score: number | string;
    };
};

interface MatchShowProps extends PageProps {
    match: Match;
    debug: {
        match_with_relations: object;
    };
}

export default function MatchShowPage({ match: initialMatch }: { match: Match }) {
    const { auth } = usePage<PageProps>().props;
    const [match, setMatch] = useState<Match>(initialMatch);
    const [groupedScores, setGroupedScores] = useState<GroupedScores>({});

    const { data, setData, post, processing, errors, reset } = useForm({
        player1_score: '',
        player2_score: '',
    });

    // Fungsi untuk mengelompokkan skor per juri
    const groupScoresByJuri = (scores: Score[]) => {
        const groups: GroupedScores = {};
        scores.forEach((score) => {
            // PERBAIKAN: Tambahkan pengecekan ini.
            // Jika data skor atau data juri tidak ada, lewati proses untuk skor ini.
            if (!score || !score.juri) {
                return;
            }

            const juriId = score.juri.id;
            if (!groups[juriId]) {
                groups[juriId] = {
                    juriName: score.juri.name,
                    player1Score: '-',
                    player2Score: '-',
                };
            }
            if (score.player_id === match.player1_id) {
                groups[juriId].player1Score = score.score_value;
            }
            if (score.player_id === match.player2_id) {
                groups[juriId].player2Score = score.score_value;
            }
        });
        setGroupedScores(groups);
    };

    // Efek untuk subscribe ke channel Echo dan grouping skor awal
    useEffect(() => {
        if (!match || !match.player1 || !match.player2) {
            console.error("Data match atau player tidak lengkap!", match);
            return; // Hentikan eksekusi jika data krusial tidak ada
        }
        
        groupScoresByJuri(match.scores);

        const channel = window.Echo.private(`match.${match.id}`);

        channel.listen('ScoreUpdated', (event: { score: Score }) => {
            console.log('Score updated event received:', event);
            toast.info(`Skor baru dari ${event.score.juri.name}!`);

            // Update state skor secara real-time
            setMatch(prevMatch => {
                const updatedScores = prevMatch.scores.filter(s =>
                    !(s.juri_id === event.score.juri_id && s.player_id === event.score.player_id)
                );
                updatedScores.push(event.score);
                return { ...prevMatch, scores: updatedScores };
            });
        });

        // Cleanup: leave channel saat komponen di-unmount
        return () => {
            channel.stopListening('ScoreUpdated');
            window.Echo.leave(`match.${match.id}`);
        };
    }, []);

    // Efek untuk meng-update tabel skor saat state match berubah
    useEffect(() => {
        groupScoresByJuri(match.scores);
    }, [match.scores]);

    // Fungsi untuk submit skor
    const submitScore = (e: React.FormEvent) => {
        e.preventDefault();

        // Kirim skor untuk player 1
        axios.post(route('api.scores.store'), {
            match_id: match.id,
            player_id: match.player1_id,
            score_value: data.player1_score,
        });

        // Kirim skor untuk player 2
        axios.post(route('api.scores.store'), {
            match_id: match.id,
            player_id: match.player2_id,
            score_value: data.player2_score,
        });

        toast.success("Skor Anda terkirim!");
    };

    return (
        <AppLayout>
            <Head title={`Pertandingan: ${match.player1.name} vs ${match.player2.name}`} />
            <div className='py-12'>
                <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6'>

                    {/* Kolom Input Skor (Hanya untuk Juri) */}
                    {(auth.user.role === 'juri' || auth.user.role === 'master_admin') && (
                        <Card className="md:col-span-1">
                            <CardHeader>
                                <CardTitle>Input Skor</CardTitle>
                                <CardDescription>Masukkan skor untuk kedua pemain.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={submitScore}>
                                    <div className="space-y-4">
                                        <div>
                                            <label>{match.player1.name}</label>
                                            <Input
                                                type="number"
                                                value={data.player1_score}
                                                onChange={e => setData('player1_score', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label>{match.player2.name}</label>
                                            <Input
                                                type="number"
                                                value={data.player2_score}
                                                onChange={e => setData('player2_score', e.target.value)}
                                            />
                                        </div>
                                        <Button type="submit" className="w-full">Kirim Skor</Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    )}

                    {/* Kolom Hasil Skor Real-time */}
                    <Card className="md:col-span-2">
                         <CardHeader>
                            <CardTitle>Papan Skor Real-time</CardTitle>
                            <CardDescription>{match.player1.name} vs {match.player2.name}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nama Juri</TableHead>
                                        <TableHead className="text-center">{match.player1.name}</TableHead>
                                        <TableHead className="text-center">{match.player2.name}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {Object.values(groupedScores).map(score => (
                                        <TableRow key={score.juriName}>
                                            <TableCell>{score.juriName}</TableCell>
                                            <TableCell className="text-center font-bold text-lg">{score.player1Score}</TableCell>
                                            <TableCell className="text-center font-bold text-lg">{score.player2Score}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </AppLayout>
    );
}
