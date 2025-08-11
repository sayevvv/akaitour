import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Head, Link } from '@inertiajs/react';
import { Book, FileText, HelpCircle } from 'lucide-react';

// 2. Gunakan interface baru ini untuk mendestrukturisasi props
export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />
            <div className="flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-background text-foreground">
                {/* Latar belakang grid. Menggunakan warna dari variabel CSS tema */}
                <div className="absolute inset-0 bg-[url('/grid-light.svg')] [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] bg-center dark:bg-[url('/grid-dark.svg')]"></div>

                <main className="relative z-10 flex flex-col items-center justify-center p-8 text-center">
                    {/* ====================================================== */}
                    {/* === PERBAIKAN PADA JUDUL UTAMA DI SINI === */}
                    {/* ====================================================== */}
                    <h1 className="bg-gradient-to-br from-gray-900 to-blue-600 bg-clip-text text-6xl font-extrabold uppercase tracking-tighter text-transparent dark:from-blue-500 dark:to-blue-100 md:text-8xl lg:text-9xl">
                        AKAITOUR
                    </h1>

                    <p className="mt-4 max-w-2xl text-lg font-normal text-muted-foreground">
                        Platform manajemen turnamen yang dirancang untuk presisi, kecepatan, dan pengalaman pengguna yang superior.
                    </p>

                    <div className="mt-8 flex gap-4">

                            <Button asChild size="lg">
                                <Link href={route('login')}>Login</Link>
                            </Button>
                            <Button asChild variant="outline" size="lg">
                                <Link href={route('register')}>Register</Link>
                            </Button>

                    </div>
                </main>

                {/* Floating Action Button (FAB) */}
                <div className="absolute right-8 bottom-8">
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button size="icon" className="h-14 w-14 rounded-full shadow-lg">
                                    <Icon iconNode={HelpCircle} />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent
                                side="left"
                                // PERBAIKAN: Tambahkan kelas-kelas ini
                                className="border bg-card p-0 text-card-foreground shadow-md"
                            >
                                <div className="flex flex-col">
                                    <Link href="#" className="flex items-center gap-3 rounded-t-md px-4 py-2 hover:bg-muted">
                                        <Icon iconNode={Book} className="h-4 w-4" />
                                        <span>Panduan</span>
                                    </Link>
                                    <Link href="#" className="flex items-center gap-3 rounded-b-md px-4 py-2 hover:bg-muted">
                                        <Icon iconNode={FileText} className="h-4 w-4" />
                                        <span>Syarat & Ketentuan</span>
                                    </Link>
                                </div>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </>
    );
}
