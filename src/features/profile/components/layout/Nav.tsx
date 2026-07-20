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
                'border-foreground-muted w-full rounded-sm border',
                className,
            )}
        >
            <ol class="flex flex-col justify-between xs:items-baseline xs:flex-row">
                {items.map((item) => (
                    <li
                        key={item.id}
                        class={cn(
                            'px-2 py-1 transition-[background-color,font-weight]',
                            item.id === activeId && 'bg-primary font-semibold',
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
