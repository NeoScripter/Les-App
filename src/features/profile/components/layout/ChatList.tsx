import cn from '@/utils/cn';
import range from '@/utils/range';
import type { ComponentChildren } from 'preact';
import type { FC } from 'preact/compat';
import { ContactItemSkeleton } from '../ui/ContactItem';

const ChatList: FC<{ className?: string; children: ComponentChildren }> = ({
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

export default ChatList;

export function ChatListSkeleton({ withTime }: { withTime: boolean }) {
    return (
        <ChatList>
            {range(1, 8).map((idx) => (
                <ContactItemSkeleton key={idx} withTime={withTime} />
            ))}
        </ChatList>
    );
}
