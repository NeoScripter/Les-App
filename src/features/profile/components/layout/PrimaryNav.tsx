import cn from '@/utils/cn';
import { useLocation } from 'preact-iso';
import type { FC } from 'preact/compat';
import { navItems, type PrimaryNavItemType } from '../../data/primaryNavItems';
import Logo from '../ui/Logo';

const PrimaryNav: FC<{ className?: string }> = ({ className }) => {
    return (
        <nav
            class={cn(
                'from-primary text-foreground-accent via-primary to-accent rounded-primary absolute inset-x-0 bottom-4 mx-auto flex h-10 w-9/10 basis-1/5 items-center justify-between gap-2 bg-red-400 bg-linear-to-r px-4',
                className,
            )}
        >
            <Logo />
            <ol class="flex basis-4/5 items-center justify-between gap-2">
                {navItems.map((item) => (
                    <NavItem key={item.id} item={item} />
                ))}
            </ol>
        </nav>
    );
};

export default PrimaryNav;

const NavItem: FC<{ item: PrimaryNavItemType }> = ({ item }) => {
    const { url } = useLocation();
    const Icon = item.icon;

    const isActive = url === item.url;

    return (
        <button
            class={cn(
                'xs:size-6 size-5',
                isActive &&
                    'bg-background relative isolate flex items-center justify-center text-white',
            )}
        >
            {isActive && (
                <span class="bg-background hexagon absolute -z-1 size-10"></span>
            )}
            <Icon />
        </button>
    );
};
