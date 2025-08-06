import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { type NavItem, type SharedData } from '@/types';
import AppLogo from './app-logo';
import { Icon } from '@/components/ui/icon';

import { Home, UserCheck, Swords, Users } from 'lucide-react';

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;

    const navigationItems: NavItem[] = [];

    // Item default untuk semua user
    navigationItems.push({
        title: 'Dashboard',
        href: 'dashboard', // Gunakan nama route, bukan URL statis
        icon: Home,
    });

    // Item khusus Master Admin
    if (auth.user.role === 'master_admin') {
        navigationItems.push({
            title: 'Verifikasi Akun',
            href: 'admin.users.verify.index', // Nama route
            icon: UserCheck,
        });
        navigationItems.push({
            title: 'Daftar Pengguna',
            href: 'admin.users.list', // Nama route
            icon: Users,
        });
        navigationItems.push({
            title: 'Turnamen',
            href: 'admin.tournaments.create',
            icon: Swords,
        });
    }

    // Item khusus Admin & Master Admin
    if (auth.user.role === 'admin' || auth.user.role === 'master_admin') {
        navigationItems.push({
            title: 'Turnamen',
            href: 'admin.tournaments.create',
            icon: Swords,
        });
    }

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navigationItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
