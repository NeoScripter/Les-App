import { CACHE_LIFETIME_MS, QUERY_CACHE_KEYS } from '@/data/constants';
import ChatShell from '@/features/profile/components/layout/ChatShell';
import ContactItem from '@/features/profile/components/ui/ContactItem';
import { chats } from '@/features/profile/data/chats';
import { apiPostOrFail } from '@/lib/apiPostOrFail';
import { getUserChatIdsUrl, type GetUserChatIdsResponse } from '@/services/api/chats';
import type { Signal } from '@preact/signals';
import { useSuspenseQuery } from '@tanstack/preact-query';

function useMyChats() {
	return useSuspenseQuery({
		queryKey: [QUERY_CACHE_KEYS.USER_CHAT_IDS],
		queryFn: () => apiPostOrFail<GetUserChatIdsResponse>(getUserChatIdsUrl, {}),
		staleTime: CACHE_LIFETIME_MS,
	});
}

function useChatProfiles(chatIds: number[]) {
	return useSuspenseQuery({
		queryKey: [QUERY_CACHE_KEYS.CHAT_PROFILES, chatIds],
		queryFn: () =>
			apiPostOrFail<GetProfileFieldsChatsResponse>(getProfileFieldsUrl, {
				ids: chatIds, // whatever shape the endpoint expects
			}),
		staleTime: CACHE_LIFETIME_MS,
	});
}

type Props = {
    selectedChatIds: Signal<string[] | null>;
};

const ChatList = ({ selectedChatIds }: Props) => {
    const { data: chatData } = useMyChats();

    console.log(chatData);

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
            {chats
                .toSorted((a, b) => b.time.localeCompare(a.time))
                .map((chat) => (
                    <ContactItem
                        key={chat.id}
                        {...chat}
                        onClick={() => handleChatClick(Number(chat.id))}
                        isSelected={selectedChatIds.value?.includes(
                            Number(chat.id),
                        )}
                    />
                ))}
        </ChatShell>
    );
};

export default ChatList;
