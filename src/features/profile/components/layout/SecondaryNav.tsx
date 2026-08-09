import { cn  }from '@/lib/utils';
import type { FC } from 'preact/compat';
import { useState } from 'preact/hooks';
import type { NavItem } from "@/features/profile/data/secondaryNavItems";

const SecondaryNav: FC<{ className?: string; items: NavItem[] }> = ({
    className,
    items,
}) => {
    const [activeId, setActiveId] = useState(items[0].id);

    return (
        <nav
            class={cn(
                'border-foreground-muted scrollbar-hidden rounded-primary w-full overflow-x-auto border',
                className,
            )}
        >
            <ol class="sm:justify-between flex flex-wrap">
                {items.map((item) => (
                    <li
                        key={item.id}
                        class={cn(
                            'rounded-primary px-3 py-1 transition-[background-color,color,box-shadow]',
                            item.id === activeId &&
                                'bg-accent text-foreground-accent shadow-accent font-medium',
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

export default SecondaryNav;
