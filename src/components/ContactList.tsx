import { CACHE_LIFETIME_MS } from '@/data/constants';
import ChatList from '@/features/profile/components/layout/ChatList';
import ContactItem from '@/features/profile/components/ui/ContactItem';
import { chats } from '@/features/profile/data/chats';
import { apiPostOrFail } from '@/lib/apiPostOrFail';
import {
    userPrivateChatsUrl,
    type UserPrivateChatsRequest,
    type UserPrivateChatsResponse,
} from '@/services/api/privateChatSecond';
import { getUserProfileIds, useUserProfiles } from '@/services/api/profile';
import { useSuspenseQuery } from '@tanstack/preact-query';
import { type FC } from 'preact/compat';

function useMyChats() {
    const { data: profileData } = useUserProfiles();
    const profileIds = getUserProfileIds(profileData);

    return useSuspenseQuery({
        queryKey: ['user-chats', profileIds],
        queryFn: () => {
            if (profileIds.length === 0) return Promise.resolve({ chats: [] });

            return apiPostOrFail<
                UserPrivateChatsResponse,
                UserPrivateChatsRequest
            >(userPrivateChatsUrl, {
                current_profiles: [profileIds[0]],
            });
        },
        staleTime: CACHE_LIFETIME_MS,
    });
}

const ContactList = () => {
    // const { data: chatData } = useMyChats();

    // console.log(chatData);

    return (
        <ChatList>
            {chats
                .toSorted((a, b) => b.time.localeCompare(a.time))
                .map((chat) => (
                    <ContactItem key={chat.id} {...chat} />
                ))}
        </ChatList>
    );
};

export default ContactList;
