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

export function NavMain({ items }: { items: NavItem[] }) {
    const { url } = usePage();

    return (
        <SidebarGroup className='px-2 py-0'>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            // Cek active state dengan route helper atau URL
                            isActive={route().current(item.href) || url === item.href}
                        >
                            <Link href={route(item.href)}>
                                {/* Render ikon jika ada */}
                                {item.icon && <item.icon className='mr-3 size-4' />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
