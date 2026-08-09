import { useChatWindowState } from '@/app/[profile]/Profile';
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
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/preact-query';
import { useEffect, useRef } from 'preact/hooks';
import { EVENTS } from "@/features/profile/data/constants";
import ChatMessage, { ChatMessageSkeleton } from "@/features/profile/components/ui/ChatMessage";

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

type ChatMessagesQueryProps = { chatId: string; messageIds: string[] };

function useChatMessages({ chatId, messageIds }: ChatMessagesQueryProps) {
    return useSuspenseQueries({
        queries: messageIds.map((messageId) => ({
            queryKey: [CACHE_KEYS.CHAT_MESSAGES, messageId],
            queryFn: () =>
                apiPostOrFail<GetChatMessagesResponse, GetChatMessagesRequest>(
                    getChatMessagesUrl,
                    {
                        chat_id: chatId,
                        message_ids: [messageId],
                        profile_id: null,
                    },
                ),
            staleTime: CACHE_LIFETIME_MS,
        })),
        combine: (results) => ({
            messages: results.flatMap((r) => r.data.messages),
        }),
    });
}

const ChatMessages = () => {
    const chatWindowState = useChatWindowState();
    const windowState = chatWindowState.value as CompleteChatInfo;
    const listRef = useRef<HTMLUListElement | null>(null);

    const { data: chatMessageIdData } = useChatMessageIds(windowState);
    const chatId = windowState.chat_id;

    const messageIds = chatMessageIdData.messages_in_between.map(
        (message) => message.message_id,
    );

    const chatMessages = useChatMessages({ chatId, messageIds });

    useEffect(() => {
        const handleNewMessage = () => {
            setTimeout(() => {
                if (!listRef.current) return;
                listRef.current.scrollIntoView(false);
            }, 10);
        };
        window.addEventListener(EVENTS.NEW_MESSAGES_ADDED, handleNewMessage);

        return () =>
            window.removeEventListener(
                EVENTS.NEW_MESSAGES_ADDED,
                handleNewMessage,
            );
    }, [chatMessages.messages.length]);

    return (
        <ul
            ref={listRef}
            key="chat-messsages"
            class="flex flex-col items-start gap-3"
        >
            {chatMessages.messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
            ))}
        </ul>
    );
};

export default ChatMessages;

export const ChatMessagesSkeleton = () => {
    return (
        <ul
            key="chat-messsages-skeleton"
            class="flex flex-col items-start gap-3"
        >
            {range(0, 10).map((idx) => (
                <ChatMessageSkeleton key={idx} />
            ))}
        </ul>
    );
};
