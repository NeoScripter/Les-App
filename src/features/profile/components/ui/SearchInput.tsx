import { cn } from '@/lib/utils';
import type { Signal } from '@preact/signals';
import type { ComponentProps, FC } from 'preact/compat';

type Props = {
    className?: string;
    query?: Signal<string>;
} & ComponentProps<'input'>;

const SearchInput: FC<Props> = ({ className, query, ...props }) => {
    return (
        <input
            type="search"
            class={cn(
                'border-foreground-muted rounded-primary mb-2 w-full border px-3 py-1',
                className,
            )}
            onInput={(e) => (query.value = e.target.value)}
            {...props}
        />
    );
};

export default SearchInput;
