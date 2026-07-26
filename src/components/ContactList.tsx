import ContactItem from '@/features/profile/components/ui/ContactItem';
import { contacts } from '@/features/profile/data/contacts';
import { apiPostOrFail } from '@/lib/apiPostOrFail';
import {
    privateChatSecondGetChatsOneVOneV0Url,
    type PrivateChatSecondGetChatsOneVOneV0Request,
    type PrivateChatSecondGetChatsOneVOneV0Response,
} from '@/services/api/privateChatSecond';
import {
    getMyProfilesV0Url,
    type GetMyProfilesV0Request,
    type GetMyProfilesV0Response,
} from '@/services/api/profile';
import cn from '@/utils/cn';
import { useQuery } from '@tanstack/preact-query';
import type { FC } from 'preact/compat';

function useMyProfiles() {
    return useQuery({
        queryKey: ['user-profiles'],
        queryFn: () =>
            apiPostOrFail<GetMyProfilesV0Response, GetMyProfilesV0Request>(
                getMyProfilesV0Url,
                {},
            ),
    });
}

function useMyChats(current_profiles?: string[]) {
    return useQuery({
        queryKey: ['user-chats', current_profiles],
        queryFn: () =>
            apiPostOrFail<
                PrivateChatSecondGetChatsOneVOneV0Response,
                PrivateChatSecondGetChatsOneVOneV0Request
            >(privateChatSecondGetChatsOneVOneV0Url, {
                current_profiles: current_profiles!,
            }),
        enabled: !!current_profiles && current_profiles.length > 0,
    });
}

const ContactList: FC<{ className?: string }> = ({ className }) => {
    const {
        data: profileData,
        isLoading: profileIsLoading,
        error: profileError,
    } = useMyProfiles();

    let profileIds = [];

    if (profileData) {
        profileIds.push(profileData.profiles[0].profile_id);
    }

    const {
        data: chatData,
        isLoading: chatsLoading,
        error: chatsError,
    } = useMyChats(profileIds);

    if (profileIsLoading || chatsLoading) return <div>Загрузка...</div>;

    if (profileError)
        return (
            <div class="text-red-500">
                Ошибка загрузки профилей: {profileError.message}
            </div>
        );
    if (chatsError)
        return (
            <div class="text-red-500">
                Ошибка загрузки чатов: {chatsError.message}
            </div>
        );
    console.log(chatData);

    return (
        <ul class={cn('scrollbar-hidden overflow-y-auto', className)}>
            {contacts
                .toSorted((a, b) => b.time.localeCompare(a.time))
                .map((contact) => (
                    <ContactItem key={contact.id} contact={contact} />
                ))}
        </ul>
    );
};

export default ContactList;
