import { useChatWindowState } from '@/app/[profile]/Profile';
import { CACHE_KEYS, CACHE_LIFETIME_MS } from '@/data/constants';
import ChatShell from '@/features/profile/components/layout/ChatShell';
import ContactItem from '@/features/profile/components/ui/ContactItem';
import {
    getUserChatIdsUrl,
    type GetChatMessageIdsRequest,
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
    const state = useChatWindowState();

    const profileIds = chatData.chats.map((chat) => chat.interlocutor_id);

    const { data: profileData } = useChatProfiles(profileIds);

    const profiles = combineChatAndProfileData(
        chatData.chats,
        profileData.profile_looks,
    );

    const handleChatClick = (
        chatId: string,
        lastReadMessageId: string | null,
    ) => {
        if (selectedChatIds.value === null) {
            const newState: GetChatMessageIdsRequest = {
                profile_id: null,
                current_read_message_id: lastReadMessageId,
                chat_id: chatId,
            };
            state.value = newState;
            return;
        }
        if (selectedChatIds.value.includes(chatId)) {
            selectedChatIds.value = selectedChatIds.value.filter(
                (val) => val !== chatId,
            );
        } else {
            selectedChatIds.value = [...selectedChatIds.value, chatId];
        }
    };

    return (
        <ChatShell isEmpty={profiles.length === 0}>
            {profiles.map((chat) => {
                return (
                    <ContactItem
                        key={chat.target_profile_id}
                        contact={convertToContactItemDTO(chat)}
                        onClick={() =>
                            handleChatClick(
                                chat.chat_id,
                                chat.last_read_message_id,
                            )
                        }
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
