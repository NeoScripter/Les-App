import cn from '@/utils/cn';
import { Scan } from 'lucide-preact';
import type { ComponentChildren } from 'preact';
import type { FC } from 'preact/compat';

const Button: FC<{
    className?: string;
    children: ComponentChildren;
    type?: 'ghost' | 'filled';
}> = ({ className, children, type = 'ghost' }) => {
    return (
        <button
            class={cn(
                'relative flex aspect-square size-8 items-center justify-center rounded-sm',
                type === 'filled' ? 'bg-primary' : 'bg-white/10',
                className,
            )}
        >
            <Scan class="absolute inset-0 size-full" stroke-width={1} />
            <span class="block size-1/2 [&>svg]:size-full">{children}</span>
        </button>
    );
};

export default Button;
