import cn from '@/utils/cn';
import range from '@/utils/range';
import type { ComponentChildren } from 'preact';
import type { FC } from 'preact/compat';
import { ContactItemSkeleton } from '../ui/ContactItem';

const ChatShell: FC<{ className?: string; children: ComponentChildren }> = ({
    className,
    children,
}) => {
    return (
        <ul
            class={cn(
                'scrollbar-hidden space-y-3 overflow-y-auto py-px',
                className,
            )}
        >
            {children}
        </ul>
    );
};

export default ChatShell;

export function ChatShellSkeleton({ withTime }: { withTime: boolean }) {
    return (
        <ChatShell>
            {range(1, 8).map((idx) => (
                <ContactItemSkeleton key={idx} withTime={withTime} />
            ))}
        </ChatShell>
    );
}
