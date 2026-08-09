import { CACHE_KEYS } from '@/data/constants';
import {
    sendMessageUrl,
    type ChatInputVisibility,
    type GetChatMessageIdsResponse,
    type SendMessageBlock,
    type SendMessageRequest,
    type SendMessageResponse,
    type ChatMessageType
} from '@/features/profile/services/api/chats';
import { apiPostOrFail } from '@/lib/api';
import { useMutation } from '@tanstack/preact-query';
import { EVENTS } from "@/features/profile/data/constants";
import { convertDateToISOWithoutMillis } from "@/features/profile/lib/formatters";

type SendMessageProps = {
    chatId: string;
    profileId: string;
    blocks: SendMessageBlock[];
};

import type { PrivateChatSecondMessageGetIdsV0ResponseMessageIdInfo } from '@/services/public-api-union/chat_private_chat_second';

function createDummyMessageIdInfo(
    profileId: string,
    messageId: string,
    number = 1_000_000,
): PrivateChatSecondMessageGetIdsV0ResponseMessageIdInfo {
    return {
        message_id: messageId,
        number,
        deleted: false,
        version: 1,
        sender_profile_id: profileId,
    };
}

function createMessageBody(
    profileId: string,
    blocks: SendMessageBlock[],
    messageId: string,
): ChatMessageType {
    const visibility: ChatInputVisibility = {
        all: true,
        roles: [],
        members: [],
    };
    return {
        id: messageId,
        deleted: false,
        version: 1,
        last_edited_at: null,
        sender_profile_id: profileId,
        blocks,
        visibility,
        created_at: convertDateToISOWithoutMillis(new Date()),
    };
}

export default function useSendMessage() {
    return useMutation({
        mutationFn: ({ chatId, profileId, blocks }: SendMessageProps) => {
            const visibility: ChatInputVisibility = {
                all: true,
                roles: [],
                members: [],
            };
            const message: SendMessageRequest = {
                profile_id: profileId,
                chat_id: chatId,
                blocks,
                visibility,
            };
            return apiPostOrFail<SendMessageResponse, SendMessageRequest>(
                sendMessageUrl,
                message,
                {},
            );
        },
        onMutate: async ({ chatId, profileId, blocks }, context) => {
            await context.client.cancelQueries({
                queryKey: [CACHE_KEYS.CHAT_MESSAGE_IDS, chatId],
            });

            const previousMessageIds = context.client.getQueryData([
                CACHE_KEYS.CHAT_MESSAGE_IDS,
                chatId,
            ]);

            const newMessageId = crypto.randomUUID();
            const newIdInfo = createDummyMessageIdInfo(profileId, newMessageId);
            const newMessageBody = createMessageBody(
                profileId,
                blocks,
                newMessageId,
            );

            context.client.setQueryData(
                [CACHE_KEYS.CHAT_MESSAGE_IDS, chatId],
                (prev: GetChatMessageIdsResponse | undefined) => {
                    if (!prev) return prev;
                    return {
                        ...prev,
                        messages_in_between: [
                            ...prev.messages_in_between,
                            newIdInfo,
                        ],
                    };
                },
            );

            context.client.setQueryData(
                [CACHE_KEYS.CHAT_MESSAGES, newMessageId],
                { messages: [newMessageBody] },
            );

            window.dispatchEvent(new CustomEvent(EVENTS.NEW_MESSAGES_ADDED));

            return { previousMessageIds, newMessageId };
        },
        onError: (_err, variables, onMutateResult, context) => {
            if (!onMutateResult) return;
            context.client.setQueryData(
                [CACHE_KEYS.CHAT_MESSAGE_IDS, variables.chatId],
                onMutateResult.previousMessageIds,
            );
            // it never existed before this mutation, so drop it entirely
            context.client.removeQueries({
                queryKey: [
                    CACHE_KEYS.CHAT_MESSAGES,
                    onMutateResult.newMessageId,
                ],
            });
        },
        onSuccess: (data, variables, onMutateResult, context) => {
            if (!onMutateResult) return;
            const { newMessageId } = onMutateResult;
            const { chatId, profileId, blocks } = variables;
            const realMessageId = data.message_id;

            context.client.setQueryData(
                [CACHE_KEYS.CHAT_MESSAGE_IDS, chatId],
                (prev: GetChatMessageIdsResponse | undefined) => {
                    if (!prev) return prev;
                    return {
                        ...prev,
                        messages_in_between: prev.messages_in_between.map(
                            (m) =>
                                m.message_id === newMessageId
                                    ? { ...m, message_id: realMessageId }
                                    : m,
                        ),
                    };
                },
            );

            const confirmedMessage = createMessageBody(
                profileId,
                blocks,
                realMessageId,
            );
            context.client.setQueryData(
                [CACHE_KEYS.CHAT_MESSAGES, realMessageId],
                { messages: [confirmedMessage] },
            );

            if (realMessageId !== newMessageId) {
                context.client.removeQueries({
                    queryKey: [CACHE_KEYS.CHAT_MESSAGES, newMessageId],
                });
            }
        },
        onSettled: (_data, _err, _variables, onMutateResult, context) => {
            if (!onMutateResult) return;

            context.client.invalidateQueries({
                queryKey: [
                    CACHE_KEYS.CHAT_MESSAGES,
                    onMutateResult.newMessageId,
                ],
            });
        },
    });
}
