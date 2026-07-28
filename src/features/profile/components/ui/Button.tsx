import cn from '@/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import type { JSX } from 'preact';

const buttonVariants = cva(
    'inline-flex select-none w-fit items-center whitespace-nowrap rounded-primary transition-[color,background,background-color,box-shadow,opacity] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 group relative isolate',
    {
        variants: {
            variant: {
                primary: '',
                icon: 'flex aspect-square size-8 items-center justify-center rounded-sm [&>svg]:text-foreground-accent [&>svg]:size-1/2',
                ghost: 'hover:bg-foreground-muted/50 focus-visible:bg-foreground-muted/50 px-3 py-2',
                outline:
                    'border-foreground-muted overflow-clip focus-visible:text-foreground-accent px-3 py-2 hover:text-foreground-accent border font-medium before:absolute before:inset-0 before:-z-1 focus-visible:before:opacity-100 before:opacity-0 before:transition-opacity hover:before:opacity-100 before:bg-primary-gradient',
            },
            size: {
                sm: 'text-sm',
                md: '',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    },
);

type ButtonProps = Omit<
    JSX.IntrinsicElements['button'] & JSX.IntrinsicElements['a'],
    'ref'
> &
    VariantProps<typeof buttonVariants> & {
        href?: string;
    };

const Button = ({
    className,
    children,
    variant,
    size,
    href,
    ...props
}: ButtonProps) => {
    const Comp = href ? 'a' : 'button';

    return (
        <Comp
            href={href}
            data-slot="button"
            class={cn(buttonVariants({ variant, className, size }))}
            {...props}
        >
            {children}
        </Comp>
    );
};

export { Button };
