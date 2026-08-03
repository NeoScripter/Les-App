import { CACHE_KEYS, CACHE_LIFETIME_MS } from '@/data/constants';
import type { CompleteChatInfo } from '@/features/profile/lib/formatters';
import {
    getChatMessageIdsUrl,
    getChatMessagesUrl,
    type GetChatMessageIdsRequest,
    type GetChatMessageIdsResponse,
    type GetChatMessagesRequest,
    type GetChatMessagesResponse,
} from '@/features/profile/services/api/chats';
import { apiPostOrFail } from '@/lib/api';
import { range } from '@/lib/utils';
import { useSuspenseQuery } from '@tanstack/preact-query';
import type { FC } from 'preact/compat';
import ChatMessage, { ChatMessageSkeleton } from '../ui/ChatMessage';

function useChatMessageIds(chatWindowState: CompleteChatInfo) {
    const req: GetChatMessageIdsRequest = {
        profile_id: null,
        chat_id: chatWindowState.chat_id,
        current_read_message_id: chatWindowState.last_read_message_id,
    };
    return useSuspenseQuery({
        queryKey: [CACHE_KEYS.CHAT_MESSAGE_IDS, chatWindowState.chat_id],
        queryFn: () =>
            apiPostOrFail<GetChatMessageIdsResponse, GetChatMessageIdsRequest>(
                getChatMessageIdsUrl,
                req,
            ),
        staleTime: CACHE_LIFETIME_MS,
    });
}

type ChatMessagesProps = { chatId: string; messageIds: string[] };

function useChatMessages({ chatId, messageIds }: ChatMessagesProps) {
    return useSuspenseQuery({
        queryKey: [CACHE_KEYS.CHAT_MESSAGES, chatId],
        queryFn: () =>
            apiPostOrFail<GetChatMessagesResponse, GetChatMessagesRequest>(
                getChatMessagesUrl,
                { chat_id: chatId, message_ids: messageIds, profile_id: null },
            ),
        staleTime: CACHE_LIFETIME_MS,
    });
}

const ChatMessagesShell: FC<{
    windowState: CompleteChatInfo;
}> = ({ windowState }) => {
    const { data: chatMessageIdData } = useChatMessageIds(windowState);
    const chatId = windowState.chat_id;

    const messageIds = chatMessageIdData.messages_in_between.map(
        (message) => message.message_id,
    );

    const { data: chatMessages } = useChatMessages({ chatId, messageIds });

    return (
        <ul
            key="chat-messsages"
            class="scrollbar-hidden flex basis-full flex-col items-start gap-3 overflow-y-auto"
        >
            {chatMessages.messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
            ))}
        </ul>
    );
};

export default ChatMessagesShell;

export const ChatMessagesShellSkeleton = () => {
    return (
        <ul
            key="chat-messsages-skeleton"
            class="scrollbar-hidden flex basis-full flex-col items-start gap-3 overflow-y-auto"
        >
            {range(0, 10).map((idx) => (
                <ChatMessageSkeleton key={idx} />
            ))}
        </ul>
    );
};
