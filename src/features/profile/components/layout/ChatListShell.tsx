import { cn, range } from '@/lib/utils';
import type { ComponentChildren } from 'preact';
import type { FC } from 'preact/compat';
import { ContactItemSkeleton } from "@/features/profile/components/ui/ContactItem";

const ChatListShell: FC<{
    className?: string;
    children: ComponentChildren;
    isEmpty?: boolean;
    emptyText?: string;
}> = ({ className, children, emptyText, isEmpty = false }) => {
    return isEmpty ? (
        <p>{emptyText ?? 'Здесь пока ничего нет'}</p>
    ) : (
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

export default ChatListShell;

export function ChatListShellSkeleton({ withTime }: { withTime: boolean }) {
    return (
        <ChatListShell>
            {range(1, 8).map((idx) => (
                <ContactItemSkeleton key={idx} withTime={withTime} />
            ))}
        </ChatListShell>
    );
}
