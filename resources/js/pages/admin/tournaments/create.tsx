import AppLayout from '@/layouts/app-layout';
import { Head, useForm, router } from '@inertiajs/react'; // Tambahkan router
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';

export default function CreateTournamentPage() {
    const { data, setData, post, processing, errors, isDirty } = useForm({
        name: '',
        description: '',
    });

     useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            // PERBAIKAN: Tambahkan pengecekan '!processing'
            if (isDirty && !processing) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        const inertiaListener = router.on('before', (event) => {
            // PERBAIKAN: Tambahkan pengecekan '!processing'
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


    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(route('admin.tournaments.store'));
    }

    return (
        <AppLayout>
            <Head title="Buat Turnamen Baru" />
            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Buat Turnamen Baru</CardTitle>
                            <CardDescription>Isi detail dasar untuk turnamen Anda.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <Label htmlFor="name">Nama Turnamen</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        autoFocus
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                <div>
                                    <Label htmlFor="description">Deskripsi (Opsional)</Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>
                                <div className="flex justify-end">
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Menyimpan...' : 'Lanjut Tambah Pemain'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
