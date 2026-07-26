import cn from '@/utils/cn';
import type { ComponentChildren } from 'preact';
import type { FC } from 'preact/compat';

const MenuHeader: FC<{ className?: string; children: ComponentChildren }> = ({
    className,
    children,
}) => {
    return (
        <header
            class={cn(
                'mt-1 flex items-center justify-between gap-2 sm:mt-2',
                className,
            )}
        >
            {children}
        </header>
    );
};

export default MenuHeader;
