import { CACHE_KEYS } from '@/data/constants';
import {
    deleteUserChatsUrl,
    type DeleteUserChatsRequest,
    type DeleteUserChatsResponse,
    type PrivateChatInfo,
} from '@/features/profile/services/api/chats';
import { apiPostOrFail } from '@/lib/api';
import { useMutation } from '@tanstack/preact-query';

export default function useDeleteChats() {
    return useMutation({
        mutationFn: (chatIds: string[]) =>
            apiPostOrFail<DeleteUserChatsResponse, DeleteUserChatsRequest>(
                deleteUserChatsUrl,
                { chat_ids: chatIds },
            ),
        onMutate: async (chatIds, context) => {
            await context.client.cancelQueries({
                queryKey: [CACHE_KEYS.USER_CHAT_IDS],
            });

            const previousChatIds = context.client.getQueryData([
                CACHE_KEYS.USER_CHAT_IDS,
            ]);

            const profileIdsToRemove =
                previousChatIds?.chats
                    .filter((c) => chatIds.includes(c.chat_id))
                    .map((c) => c.interlocutor_id) ?? [];

            await Promise.all(
                profileIdsToRemove.map((profileId) =>
                    context.client.cancelQueries({
                        queryKey: [CACHE_KEYS.PROFILE_FIELDS, profileId],
                    }),
                ),
            );
            const previousProfilesById = new Map(
                profileIdsToRemove.map((profileId) => [
                    profileId,
                    context.client.getQueryData([
                        CACHE_KEYS.PROFILE_FIELDS,
                        profileId,
                    ]),
                ]),
            );

            // Optimistically remove the chat(s)
            context.client.setQueryData([CACHE_KEYS.USER_CHAT_IDS], (old) => {
                if (!old) return old;
                const oldChats: PrivateChatInfo[] = structuredClone(old.chats);
                return {
                    ...old,
                    chats: oldChats.filter((c) => !chatIds.includes(c.chat_id)),
                };
            });

            // Drop the now-unused per-id profile queries from the cache
            profileIdsToRemove.forEach((profileId) => {
                context.client.removeQueries({
                    queryKey: [CACHE_KEYS.PROFILE_FIELDS, profileId],
                });
            });

            return { previousChatIds, previousProfilesById };
        },
        onError: (err, chatIds, onMutateResult, context) => {
            if (!onMutateResult) return;
            context.client.setQueryData(
                [CACHE_KEYS.USER_CHAT_IDS],
                onMutateResult.previousChatIds,
            );
            onMutateResult.previousProfilesById.forEach((data, profileId) => {
                context.client.setQueryData(
                    [CACHE_KEYS.PROFILE_FIELDS, profileId],
                    data,
                );
            });
        },
        onSettled: (data, error, chatIds, onMutateResult, context) => {
            context.client.invalidateQueries({
                queryKey: [CACHE_KEYS.USER_CHAT_IDS],
            });
            if (!onMutateResult) return;

            onMutateResult.previousProfilesById.forEach((data, profileId) => {
                context.client.invalidateQueries({
                    queryKey: [CACHE_KEYS.PROFILE_FIELDS, profileId],
                });
            });
        },
    });
}
