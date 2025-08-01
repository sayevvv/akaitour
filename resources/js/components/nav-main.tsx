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
import { Icon } from './icon';

export function NavMain({ items }: { items: NavItem[] }) {
    const { url } = usePage();

    return (
        <SidebarGroup className='px-2 py-0'>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    // Cek kondisi link di sini agar lebih bersih
                    const isStaticLink = item.href === '#';

                    // Logika untuk menentukan status aktif dengan aman
                    const isActive = !isStaticLink && (route().current(item.href) || url.startsWith(item.href));

                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={isActive} // Gunakan variabel yang sudah aman
                            >
                                <Link href={isStaticLink ? '#' : route(item.href)}>
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
