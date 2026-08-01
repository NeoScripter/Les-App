import { cn  }from '@/lib/utils';
import type { ComponentProps, FC } from 'preact/compat';

type Props = {
    className?: string;
} & ComponentProps<'input'>;

const SearchInput: FC<Props> = ({ className, ...props }) => {
    return (
        <input
            type="search"
            class={cn(
                'border-foreground-muted rounded-primary mb-2 w-full border px-3 py-1',
                className,
            )}
            {...props}
        />
    );
};

export default SearchInput;
