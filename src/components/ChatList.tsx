import { CACHE_LIFETIME_MS } from '@/data/constants';
import ChatShell from '@/features/profile/components/layout/ChatShell';
import ContactItem from '@/features/profile/components/ui/ContactItem';
import { chats } from '@/features/profile/data/chats';
import { apiPostOrFail } from '@/lib/apiPostOrFail';
import { userChatsUrl, type UserChatsResponse } from '@/services/api/chats';
import type { Signal } from '@preact/signals';
import { useSuspenseQuery } from '@tanstack/preact-query';

function useMyChats() {
    return useSuspenseQuery({
        queryKey: ['user-chats'],
        queryFn: () => {
            return apiPostOrFail<UserChatsResponse>(userChatsUrl, {});
        },
        staleTime: CACHE_LIFETIME_MS,
    });
}

type Props = {
    selectedChatIds: Signal<number[] | null>;
};

const ChatList = ({ selectedChatIds }: Props) => {
    // const { data: chatData } = useMyChats();

    // console.log(chatData);

    const handleChatClick = (id: number) => {
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
