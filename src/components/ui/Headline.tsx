import { cn } from '@/lib/utils';
import type { ComponentChildren } from 'preact';
import type { FC } from 'preact/compat';

const Headline: FC<{
    className?: string;
    children: ComponentChildren;
    as?: keyof HTMLElementTagNameMap;
}> = ({ className, children, as: Tag = 'p' }) => {
    return <Tag class={cn("text-xl font-semibold", className)}>{children}</Tag>;
};

export default Headline;
