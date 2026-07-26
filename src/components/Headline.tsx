import type { ComponentChildren } from 'preact';
import type { FC } from 'preact/compat';

const Headline: FC<{
    className?: string;
    children: ComponentChildren;
    as?: 'h1' | 'h2' | 'h3' | 'p';
}> = ({ children, as: Tag = 'p' }) => {
    return <Tag class="text-xl font-semibold">{children}</Tag>;
};

export default Headline;
