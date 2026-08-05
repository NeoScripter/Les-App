import { CACHE_KEYS } from '@/data/constants';
import {
    sendMessageUrl,
    type ChatInputVisibility,
    type ChatMessageType,
    type SendMessageBlock,
    type SendMessageRequest,
    type SendMessageResponse,
} from '@/features/profile/services/api/chats';
import { apiPostOrFail } from '@/lib/api';
import type { PrivateChatSecondMessageGetIdsV0ResponseMessageIdInfo } from '@/services/public-api-union/chat_private_chat_second';
import { useMutation } from '@tanstack/preact-query';

type SendMessageProps = {
    chatId: string;
    profileId: string;
    blocks: SendMessageBlock[];
};

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

            // 1. Append the new id into the message-id list for this chat
            context.client.setQueryData(
                [CACHE_KEYS.CHAT_MESSAGE_IDS, chatId],
                (prev) => {
                    if (!prev || !prev.messages_in_between) return prev;
                    const prevMessageInfo: PrivateChatSecondMessageGetIdsV0ResponseMessageIdInfo[] =
                        structuredClone(prev.messages_in_between);
                    const newMessageInfo: PrivateChatSecondMessageGetIdsV0ResponseMessageIdInfo =
                        {
                            message_id: newMessageId,
                            number: 1_000_000,
                            deleted: false,
                            version: 1,
                            sender_profile_id: profileId,
                        };
                    return {
                        ...prev,
                        messages_in_between: [
                            ...prevMessageInfo,
                            newMessageInfo,
                        ],
                    };
                },
            );

            // 2. Seed the per-message cache entry so useChatMessages' fan-out
            //    query for newMessageId resolves from cache instead of fetching
            const newMessage: ChatMessageType = {
                id: newMessageId,
                deleted: false,
                version: 1,
                last_edited_at: null,
                sender_profile_id: profileId,
                blocks,
                visibility: {
                    all: true,
                    roles: [],
                    members: [],
                },
            };
            context.client.setQueryData(
                [CACHE_KEYS.CHAT_MESSAGES, newMessageId],
                { messages: [newMessage] },
            );

            return { previousMessageIds, newMessageId };
        },
        onError: (err, variables, onMutateResult, context) => {
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
        onSettled: (data, error, variables, onMutateResult, context) => {
            if (!onMutateResult) return;

            const { newMessageId, previousMessageIds } = onMutateResult;
            const { chatId, profileId, blocks } = variables;

            // Mutation failed: roll back fully (same as onError already does,
            // but onSettled always runs, so this covers the failure path here too).
            if (error || !data) {
                context.client.setQueryData(
                    [CACHE_KEYS.CHAT_MESSAGE_IDS, chatId],
                    previousMessageIds,
                );
                context.client.removeQueries({
                    queryKey: [CACHE_KEYS.CHAT_MESSAGES, newMessageId],
                });
                return;
            }

            // Mutation succeeded: swap the dummy id/message for the real one,
            // in place, without invalidating (no refetch).

            const realMessageId = data.message_id;

            // 1. Replace the dummy id in messages_in_between with the real id/number
            context.client.setQueryData(
                [CACHE_KEYS.CHAT_MESSAGE_IDS, chatId],
                (prev) => {
                    if (!prev || !prev.messages_in_between) return prev;
                    return {
                        ...prev,
                        messages_in_between: prev.messages_in_between.map(
                            (m) =>
                                m.message_id === newMessageId
                                    ? {
                                          ...m,
                                          message_id: realMessageId,
                                      }
                                    : m,
                        ),
                    };
                },
            );

            // 2. Seed the cache entry under the real message id with authoritative data
            const confirmedMessage: ChatMessageType = {
                id: realMessageId,
                deleted: false,
                last_edited_at: null,
                sender_profile_id: profileId,
                blocks,
                visibility: {
                    all: true,
                    roles: [],
                    members: [],
                },
            };
            context.client.setQueryData(
                [CACHE_KEYS.CHAT_MESSAGES, realMessageId],
                { messages: [confirmedMessage] },
            );

            // 3. Remove the now-orphaned dummy entry (only if the id actually changed)
            if (realMessageId !== newMessageId) {
                context.client.removeQueries({
                    queryKey: [CACHE_KEYS.CHAT_MESSAGES, newMessageId],
                });
            }
        },
        // onSettled: (data, error, variables, onMutateResult, context) => {
        //     context.client.invalidateQueries({
        //         queryKey: [CACHE_KEYS.CHAT_MESSAGE_IDS, variables.chatId],
        //     });
        //     if (!onMutateResult) return;
        //     context.client.invalidateQueries({
        //         queryKey: [
        //             CACHE_KEYS.CHAT_MESSAGES,
        //             onMutateResult.newMessageId,
        //         ],
        //     });
        // },
    });
}
