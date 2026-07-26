import cn from '@/utils/cn';
import type { ComponentChildren } from 'preact';
import type { FC } from 'preact/compat';

const MenuLayout: FC<{ children: ComponentChildren; className?: string }> = ({
    children,
    className,
}) => {
    return (
        <article
            class={cn(
                'border-foreground-muted rounded-primary relative m-2 flex h-full max-w-md flex-col gap-4 border px-(--px) py-2 [--px:0.75rem] sm:m-4',
                className,
            )}
        >
            {children}
        </article>
    );
};

export default MenuLayout;
