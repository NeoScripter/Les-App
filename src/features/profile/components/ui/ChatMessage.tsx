import { useChatWindowState } from '@/app/[profile]/Profile';
import { cn } from '@/lib/utils';
import type { FC } from 'preact/compat';
import type { ChatMessageType } from '../../services/api/chats';

const ChatMessage: FC<{ className?: string; message: ChatMessageType }> = ({
    className,
    message,
}) => {
    const chatWindowState = useChatWindowState();
    const chatInfo = chatWindowState.value;

    if (chatInfo == null) {
        return null;
    }

    const isSentByUser = chatInfo.profile_id === message.sender_profile_id;

    return (
        <>
            {message.blocks.map((block, idx) => (
                <li
                    key={idx}
                    class={cn(
                        'max-w-lg rounded-xl rounded-bl-sm px-3 py-2 text-sm',
                        isSentByUser
                            ? 'text-foreground bg-zinc-800'
                            : 'bg-primary text-foreground-accent self-end',
                        className,
                    )}
                >
                    <p key={idx}>{block.content_text}</p>
                    <p
                        class={cn(
                            'mt-1 text-xs text-current/75',
                            !isSentByUser && 'ml-auto w-fit',
                        )}
                    >
                        19:00
                    </p>
                </li>
            ))}
        </>
    );
};

export function ChatMessageSkeleton() {
    return (
        <li
            class={cn(
                'max-w-50 rounded-xl rounded-bl-sm bg-zinc-800 px-3 py-2 text-sm odd:self-end',
            )}
        >
            <p class="skeleton">Lorem ipsum dolor sit amet consectetur</p>
            <p class={cn('skeleton mt-1 w-fit text-xs odd:ml-auto')}>19:00</p>
        </li>
    );
}

export default ChatMessage;
