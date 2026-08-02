import { cn } from '@/lib/utils';
import type { Signal } from '@preact/signals';
import type { ComponentProps, FC } from 'preact/compat';

type Props = {
    className?: string;
    query?: Signal<string>;
} & ComponentProps<'input'>;

const Input: FC<Props> = ({ className, query, ...props }) => {
    return (
        <input
            class={cn(
                'border-foreground-muted rounded-primary w-full border px-3 py-1',
                className,
            )}
            onInput={(e) => (query.value = e.target.value)}
            {...props}
        />
    );
};

export default Input;
