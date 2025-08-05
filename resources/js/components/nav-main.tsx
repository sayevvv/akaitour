// resources/js/components/nav-main.tsx

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Icon } from '@/components/ui/icon';

export function NavMain({ items }: { items: NavItem[] }) {
    const { url } = usePage();

    return (
        <SidebarGroup className='px-2 py-0'>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    // Cek jika link adalah link statis (bukan nama route)
                    const isStaticLink = item.href === '#';

                    // Cek status aktif dengan aman, hindari memanggil route() untuk link statis
                    const isActive = !isStaticLink && (route().current(item.href) || url.startsWith(route(item.href)));

                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild isActive={isActive}>
                                {/* Gunakan href statis jika isStaticLink, jika tidak, panggil route() */}
                                <Link href={isStaticLink ? item.href : route(item.href)}>
                                    {item.icon && <Icon iconNode={item.icon} className='mr-3 size-4' />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
