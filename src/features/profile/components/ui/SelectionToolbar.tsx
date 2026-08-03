import Headline from '@/components/ui/Headline';
import { CACHE_KEYS } from '@/data/constants';
import { Button } from '@/features/profile/components/ui/Button';
import {
    deleteUserChatsUrl,
    type DeleteUserChatsRequest,
    type DeleteUserChatsResponse,
    type PrivateChatInfo,
} from '@/features/profile/services/api/chats';
import { apiPostOrFail } from '@/lib/api';
import type { Signal } from '@preact/signals';
import { useMutation } from '@tanstack/preact-query';
import { CheckCheck, Trash2 } from 'lucide-preact';
import type { FC } from 'preact/compat';
import type { CompleteChatInfo } from '../../lib/formatters';

function useDeleteMyChats() {
    return useMutation({
        mutationFn: (chatIds: string[]) =>
            apiPostOrFail<DeleteUserChatsResponse, DeleteUserChatsRequest>(
                deleteUserChatsUrl,
                { chat_ids: chatIds },
            ),
        onMutate: async (chatIds, context) => {
            await Promise.all([
                context.client.cancelQueries({
                    queryKey: [CACHE_KEYS.PROFILE_FIELDS],
                }),
                context.client.cancelQueries({
                    queryKey: [CACHE_KEYS.USER_CHAT_IDS],
                }),
            ]);

            const previousProfiles = context.client.getQueryData([
                CACHE_KEYS.PROFILE_FIELDS,
            ]);
            const previousChatIds = context.client.getQueryData([
                CACHE_KEYS.USER_CHAT_IDS,
            ]);

            context.client.setQueryData([CACHE_KEYS.PROFILE_FIELDS], (old) => {
                if (!old) return old;
                const oldProfiles: CompleteChatInfo[] = structuredClone(
                    old.profile_looks,
                );
                return {
                    ...old,
                    profile_looks: oldProfiles.filter(
                        (p) => !chatIds.includes(p.chat_id),
                    ),
                };
            });

            context.client.setQueryData([CACHE_KEYS.USER_CHAT_IDS], (old) => {
                if (!old) return old;
                const oldChats: PrivateChatInfo[] = structuredClone(old.chats);
                return {
                    ...old,
                    chats: oldChats.filter((p) => !chatIds.includes(p.chat_id)),
                };
            });

            return { previousProfiles, previousChatIds };
        },
        onError: (err, chatId, onMutateResult, context) => {
            console.log('mutate result: ', onMutateResult);
            if (onMutateResult) {
                context.client.setQueryData(
                    [CACHE_KEYS.PROFILE_FIELDS],
                    onMutateResult.previousProfiles,
                );
                context.client.setQueryData(
                    [CACHE_KEYS.USER_CHAT_IDS],
                    onMutateResult.previousChatIds,
                );
            }
        },
        onSettled: (data, error, variables, onMutateResult, context) => {
            context.client.invalidateQueries({
                queryKey: [CACHE_KEYS.PROFILE_FIELDS],
            });
            context.client.invalidateQueries({
                queryKey: [CACHE_KEYS.USER_CHAT_IDS],
            });
        },
    });
}

const SelectionToolbar: FC<{ selectedIds: Signal<string[] | null> }> = ({
    selectedIds,
}) => {
    const { mutate: deleteChats } = useDeleteMyChats();

    if (selectedIds.value === null) return;

    const handleDeleteSelectedChats = () => {
        const ids = selectedIds.value;

        if (!ids || ids.length === 0) return;

        deleteChats(ids, {
            onSuccess: () => {
                selectedIds.value = null;
            },
        });
    };

    return (
        <>
            <Button
                disabled={selectedIds.value.length === 0}
                className="bg-accent"
                onClick={handleDeleteSelectedChats}
                variant="icon"
            >
                <Trash2 />
            </Button>
            <Headline as="h1">Выбрано: {selectedIds.value.length}</Headline>
            <Button
                onClick={() => (selectedIds.value = null)}
                className="bg-primary"
                variant="icon"
            >
                <CheckCheck />
            </Button>
        </>
    );
};

export default SelectionToolbar;
