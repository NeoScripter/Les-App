import PrimaryNav from '@/features/profile/components/layout/PrimaryNav';
import cn from '@/utils/cn';
import type { ComponentChildren } from 'preact';
import type { FC } from 'preact/compat';

const ChatLayout: FC<{ children: ComponentChildren; className?: string }> = ({
    children,
    className,
}) => {
    return (
        <main class="h-full">
            {/* chat menu */}
            <article
                class={cn(
                    'border-foreground-muted rounded-primary relative m-2 h-full max-w-md gap-4 border px-3 py-2 sm:m-4',
                    className,
                )}
            >
                {children}

                <PrimaryNav />
            </article>
        </main>
    );
};

export default ChatLayout;
