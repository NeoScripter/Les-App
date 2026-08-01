import Headline from '@/components/ui/Headline';
import { CACHE_KEYS } from '@/data/constants';
import { Button } from '@/features/profile/components/ui/Button';
import {
    deleteUserChatsUrl,
    type DeleteUserChatsRequest,
    type DeleteUserChatsResponse,
} from '@/features/profile/services/api/chats';
import { apiPostOrFail } from '@/lib/api';
import type { Signal } from '@preact/signals';
import { useMutation, useQueryClient } from '@tanstack/preact-query';
import { CheckCheck, Trash2 } from 'lucide-preact';
import type { FC } from 'preact/compat';

function useDeleteMyChats() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (chatIds: string[]) =>
            apiPostOrFail<DeleteUserChatsResponse, DeleteUserChatsRequest>(
                deleteUserChatsUrl,
                { chat_ids: chatIds },
            ),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [CACHE_KEYS.USER_CHAT_IDS, CACHE_KEYS.PROFILE_FIELDS],
            });
        },
    });
}

const SelectionToolbar: FC<{ selectedIds: Signal<string[] | null> }> = ({
    selectedIds,
}) => {
    const { mutate: deleteChats, isPending } = useDeleteMyChats();

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
