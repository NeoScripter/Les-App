import { useChatWindowState } from '@/app/[profile]/Profile';
import { cn } from '@/lib/utils';
import { File } from 'lucide-preact';
import type { FC } from 'preact/compat';
import { covertDateFromISOToHourAndMinute } from '../../lib/formatters';
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
        <li
            class={cn(
                'max-w-lg rounded-xl px-3 py-2 text-sm',
                isSentByUser
                    ? 'bg-primary text-foreground-accent self-end rounded-br-sm'
                    : 'text-foreground rounded-bl-sm bg-zinc-800',
                className,
            )}
        >
            <div class="divide-slate-500/20 divide-y space-y-2">
                {message.blocks.map((block, idx) => (
                    <div key={idx} class='not-last:pb-2'>
                        {block.type === 'file' ? (
                            <div class="flex items-center gap-4">
                                <div>
                                    <File class="size-7" />
                                    <p class="text-xs">4.8 KB</p>
                                </div>
                                <p>{block.content_text}</p>
                            </div>
                        ) : (
                            <p>{block.content_text}</p>
                        )}
                    </div>
                ))}
            </div>
            <p
                class={cn(
                    'mt-1 text-xs text-current/75',
                    isSentByUser ? 'ml-auto w-fit' : '',
                )}
            >
                {message.created_at &&
                    covertDateFromISOToHourAndMinute(message.created_at)}
            </p>
        </li>
    );
};
// TODO: dynamic gradient orange: rgb(255, 116, 1), green : linear-gradient(rgb(177, 255, 29) 0%, rgb(177, 255, 29) 100%)

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
