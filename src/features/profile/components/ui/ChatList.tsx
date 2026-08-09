import { useChatWindowState } from '@/app/[profile]/Profile';
import { CACHE_KEYS, CACHE_LIFETIME_MS } from '@/data/constants';
import ChatListShell from '@/features/profile/components/layout/ChatListShell';
import ContactItem from '@/features/profile/components/ui/ContactItem';
import {
    getUserChatIdsUrl,
    type GetUserChatIdsResponse,
} from '@/features/profile/services/api/chats';
import { apiPostOrFail } from '@/lib/api';
import type { Signal } from '@preact/signals';
import { useSuspenseQuery } from '@tanstack/preact-query';
import useChatProfiles from "@/features/profile/hooks/useChatProfiles";
import {
    combineChatAndProfileData,
    type CompleteChatInfo,
} from "@/features/profile/lib/formatters";
import convertToContactItemDTO from "@/features/profile/services/DTO/contactItemDTO";

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
    const chatWindowState = useChatWindowState();

    const profileIds = chatData.chats.map((chat) => chat.interlocutor_id).slice(14);

    const profileData = useChatProfiles(profileIds);

    const profiles = combineChatAndProfileData(
        chatData.chats,
        profileData.profile_looks,
    );

    const handleChatClick = (chatInfo: CompleteChatInfo) => {
        const selectedIds = selectedChatIds.value;
        const isSelectingForDeletion = selectedIds !== null;

        if (!isSelectingForDeletion) {
            chatWindowState.value = chatInfo;
            return;
        }

        const chatId = chatInfo.chat_id;
        const isChatSelected = selectedIds.includes(chatId);

        if (isChatSelected) {
            selectedChatIds.value = selectedIds.filter((val) => val !== chatId);
            return;
        }

        selectedChatIds.value = [...selectedIds, chatId];
    };

    return (
        <ChatListShell isEmpty={profiles.length === 0}>
            {profiles.map((chat) => {
                return (
                    <ContactItem
                        key={chat.chat_id}
                        contact={convertToContactItemDTO(chat)}
                        onClick={() => handleChatClick(chat)}
                        isSelected={selectedChatIds.value?.includes(
                            chat.chat_id,
                        )}
                    />
                );
            })}
        </ChatListShell>
    );
};

export default ChatList;
