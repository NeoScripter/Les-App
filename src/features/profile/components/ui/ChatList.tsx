import { CACHE_KEYS, CACHE_LIFETIME_MS } from '@/data/constants';
import ChatShell from '@/features/profile/components/layout/ChatShell';
import ContactItem from '@/features/profile/components/ui/ContactItem';
import {
    getUserChatIdsUrl,
    type GetUserChatIdsResponse,
} from '@/features/profile/services/api/chats';
import { apiPostOrFail } from '@/lib/api';
import type { Signal } from '@preact/signals';
import { useSuspenseQuery } from '@tanstack/preact-query';
import useChatProfiles from '../../hooks/useChatProfiles';
import { combineChatAndProfileData } from '../../lib/formatters';
import convertToContactItemDTO from '../../services/DTO/contactItemDTO';

function useMyChats() {
    return useSuspenseQuery({
        queryKey: [CACHE_KEYS.USER_CHAT_IDS],
        queryFn: () =>
            apiPostOrFail<GetUserChatIdsResponse>(getUserChatIdsUrl, {}),
        staleTime: CACHE_LIFETIME_MS,
    });
}

type Props = {
    selectedChatIds: Signal<string[] | null>;
};

const ChatList = ({ selectedChatIds }: Props) => {
    const { data: chatData } = useMyChats();

    const profileIds = chatData.chats.map((chat) => chat.interlocutor_id);

    const { data: profileData } = useChatProfiles(profileIds);

    const profiles = combineChatAndProfileData(
        chatData.chats,
        profileData.profile_looks,
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
        <ChatShell isEmpty={profiles.length === 0}>
            {profiles.map((chat) => {
                return (
                    <ContactItem
                        key={chat.target_profile_id}
                        contact={convertToContactItemDTO(chat)}
                        onClick={() => handleChatClick(chat.chat_id)}
                        isSelected={selectedChatIds.value?.includes(
                            chat.chat_id,
                        )}
                    />
                );
            })}
        </ChatShell>
    );
};

export default ChatList;
