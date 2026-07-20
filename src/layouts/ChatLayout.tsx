import type { ComponentChildren } from 'preact';
import type { FC } from 'preact/compat';

const ChatLayout: FC<{ children: ComponentChildren }> = ({ children }) => {
    return (
        <main class="border-foreground-muted m-2 h-full max-w-md space-y-4 rounded-sm border px-3 py-2 sm:m-4">
            {children}
        </main>
    );
};

export default ChatLayout;
