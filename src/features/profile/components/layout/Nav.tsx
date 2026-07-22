import cn from '@/utils/cn';
import type { FC } from 'preact/compat';
import { useState } from 'preact/hooks';
import type { NavItem } from '../../data/navItems';

const Nav: FC<{ className?: string; items: NavItem[] }> = ({
    className,
    items,
}) => {
    const [activeId, setActiveId] = useState(items[0].id);

    return (
        <nav
            class={cn(
                'border-foreground-muted w-full overflow-clip rounded-primary border',
                className,
            )}
        >
            <ol class="grid grid-cols-[repeat(auto-fit,minmax(7rem,1fr))] xs:flex xs:justify-between">
                {items.map((item) => (
                    <li
                        key={item.id}
                        class={cn(
                            'px-3 py-1 transition-[background-color,color] text-sm rounded-primary',
                            item.id === activeId &&
                                'bg-accent text-foreground-accent font-medium',
                        )}
                    >
                        <button
                            type="button"
                            class="w-full"
                            onClick={() => setActiveId(item.id)}
                        >
                            {item.label}
                        </button>
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Nav;
