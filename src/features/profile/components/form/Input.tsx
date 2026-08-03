import { cn } from '@/lib/utils';
import type { ComponentProps, FC } from 'preact/compat';

type Props = {
    className?: string;
} & ComponentProps<'input'>;

const Input: FC<Props> = ({ className, ...props }) => {
    return (
        <input
            class={cn(
                'border-foreground-muted rounded-primary w-full border px-3 py-1',
                className,
            )}
            {...props}
        />
    );
};

export default Input;
