import cn from '@/utils/cn';
import type { ComponentChildren } from 'preact';
import type { FC } from 'preact/compat';

const ChatLayout: FC<{ children: ComponentChildren; className?: string }> = ({
    children,
    className,
}) => {
    return (
        <main
            class={cn(
                'border-foreground-muted m-2 h-full max-w-md gap-4 rounded-primary border px-3 py-2 sm:m-4',
                className,
            )}
        >
            {children}
        </main>
    );
};

export default ChatLayout;
