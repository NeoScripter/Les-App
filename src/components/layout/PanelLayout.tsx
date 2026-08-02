import { cn  }from '@/lib/utils';
import type { ComponentChildren } from 'preact';
import type { FC } from 'preact/compat';

const PanelLayout: FC<{ children: ComponentChildren; className?: string }> = ({
    children,
    className,
}) => {
    return (
        <article
            class={cn(
                'border-foreground-muted rounded-primary relative m-2 flex h-[calc(100svh-(var(--margin)*2))] [--margin:0.5rem] sm:[--margin:1rem] max-w-md flex-col gap-4 border px-(--px) py-(--py) [--px:0.75rem] [--py:0.5rem] sm:m-4',
                className,
            )}
        >
            {children}
        </article>
    );
};

export default PanelLayout;
