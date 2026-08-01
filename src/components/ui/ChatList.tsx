import { CACHE_KEYS, CACHE_LIFETIME_MS } from '@/data/constants';
import ChatShell from '@/features/profile/components/layout/ChatShell';
import ContactItem from '@/features/profile/components/ui/ContactItem';
import { apiPostOrFail } from '@/lib/api';
import {
    getProfileFileldsUrl,
    getUserChatIdsUrl,
    type GetProfileFieldsRequest,
    type GetProfileFieldsResponse,
    type GetUserChatIdsResponse,
} from '@/features/profile/services/api/chats';
import type { Signal } from '@preact/signals';
import { useSuspenseQuery } from '@tanstack/preact-query';

function useMyChats() {
    return useSuspenseQuery({
        queryKey: [CACHE_KEYS.USER_CHAT_IDS],
        queryFn: () =>
            apiPostOrFail<GetUserChatIdsResponse>(getUserChatIdsUrl, {}),
        staleTime: CACHE_LIFETIME_MS,
    });
}

function useChatProfiles(chatIds: string[]) {
    return useSuspenseQuery({
        queryKey: [CACHE_KEYS.PROFILE_FIELDS, chatIds],
        queryFn: () =>
            apiPostOrFail<GetProfileFieldsResponse, GetProfileFieldsRequest>(
                getProfileFileldsUrl,
                {
                    target_profile_ids: chatIds,
                    required_fields: [
                        'name',
                        'nickname',
                        'first_name',
                        'last_name',
                        'self_description',
                        'avatars',
                        'relationship_state.contact',
                    ],
                },
            ),
        staleTime: CACHE_LIFETIME_MS,
    });
}

type Props = {
    selectedChatIds: Signal<string[] | null>;
};

const ChatList = ({ selectedChatIds }: Props) => {
    const { data: chatData } = useMyChats();
    const { data: profileData } = useChatProfiles(
        chatData.chats.map((chat) => chat.interlocutor_id),
    );

    const handleChatClick = (id: string) => {
        if (selectedChatIds.value === null) {
            // TODO: open the chat messages
            return;
        }
        if (selectedChatIds.value.includes(id)) {
            selectedChatIds.value = selectedChatIds.value.filter(
                (val) => val !== id,
            );
        } else {
            selectedChatIds.value = [...selectedChatIds.value, id];
        }
    };

    return (
        <ChatShell>
            {profileData.profile_looks.map((chat) => (
                <ContactItem
                    key={chat.target_profile_id}
                    chat={chat}
                    onClick={() => handleChatClick(chat.target_profile_id)}
                    isSelected={selectedChatIds.value?.includes(
                        chat.target_profile_id,
                    )}
                />
            ))}
        </ChatShell>
    );
};

export default ChatList;
