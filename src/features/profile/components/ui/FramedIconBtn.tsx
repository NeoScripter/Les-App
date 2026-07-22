import cn from '@/utils/cn';
import { Scan, type LucideIcon } from 'lucide-preact';
import type { FC } from 'preact/compat';

const FramedIconBtn: FC<{
    className?: string;
    icon: LucideIcon;
    variant?: 'ghost' | 'default';
}> = ({ className, icon, variant = 'default' }) => {
    const Icon = icon;

    return (
        <button
            class={cn(
                'relative flex aspect-square size-8 items-center justify-center rounded-sm',
                variant === 'default'
                    ? 'bg-primary text-foreground-accent'
                    : 'bg-white/10',
                className,
            )}
        >
            <Scan class="absolute inset-0 size-full" stroke-width={1} />
            <Icon class="block size-1/2 [&>svg]:size-full" />
        </button>
    );
};

export default FramedIconBtn;
