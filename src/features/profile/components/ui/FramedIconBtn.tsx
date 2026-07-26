import cn from '@/utils/cn';
import { Scan, type LucideIcon } from 'lucide-preact';
import { type ComponentProps, type FC } from 'preact/compat';

type FramedIconBtnProps = {
    className?: string;
    icon: LucideIcon;
    variant?: 'ghost' | 'default';
} & ComponentProps<'button'>;

const FramedIconBtn: FC<FramedIconBtnProps> = ({
    className,
    icon,
    variant = 'default',
    ...props
}) => {
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
            {...props}
        >
            <Scan class="absolute inset-0 size-full" stroke-width={1} />
            <Icon class="block size-1/2 [&>svg]:size-full" />
        </button>
    );
};

export default FramedIconBtn;
