import type { ComponentChildren } from 'preact';
import type { FC } from 'preact/compat';

const Headline: FC<{ className?: string, children: ComponentChildren }> = ({ children }) => {
    return <h1 class="text-xl font-semibold">{children}</h1>;
};

export default Headline;
