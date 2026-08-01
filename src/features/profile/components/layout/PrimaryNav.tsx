import Hex from '@/components/ui/Hex';
import { cn  }from '@/lib/utils';
import { useLocation } from 'preact-iso';
import type { FC } from 'preact/compat';
import { navItems, type PrimaryNavItemType } from '../../data/primaryNavItems';
import Logo from '../ui/Logo';

const PrimaryNav: FC<{ className?: string }> = ({ className }) => {
    return (
        <nav
            class={cn(
                'text-foreground-accent rounded-primary bg-primary-gradient absolute inset-x-0 bottom-4 mx-auto flex h-10 w-9/10 basis-1/5 items-center justify-between gap-2 px-4',
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
                'xs:size-6 relative size-5',
                isActive &&
                    'bg-background relative isolate flex items-center justify-center text-white',
            )}
        >
            {isActive && (
                <Hex className="bg-background absolute inset-1/2 -z-1 h-10 -translate-1/2" />
            )}
            <Icon />
        </button>
    );
};
