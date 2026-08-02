import { cn } from '@/lib/utils';
import { Scan, type LucideIcon } from 'lucide-preact';
import { type ComponentProps, type FC } from 'preact/compat';

type FramedIconBtnProps = {
    className?: string;
    icon: LucideIcon;
    variant?: 'ghost' | 'default';
    size?: 'sm' | 'md' | 'lg';
} & ComponentProps<'button'>;

const FramedIconBtn: FC<FramedIconBtnProps> = ({
    className,
    icon,
    variant = 'default',
    size = 'md',
    ...props
}) => {
    const Icon = icon;

    return (
        <button
            class={cn(
                'relative flex aspect-square items-center justify-center rounded-sm',
                {
                    'size-8': size === 'sm',
                    'size-10': size === 'md',
                    'size-12': size === 'lg',
                },
                variant === 'default'
                    ? 'bg-primary text-foreground-accent'
                    : 'bg-white/10',
                className,
            )}
            {...props}
        >
            <Scan class="absolute inset-0 size-full" stroke-width={1} />
            <Icon class="block size-1/2 [&>svg]:size-full" />
        </button>
    );
};

export default FramedIconBtn;
