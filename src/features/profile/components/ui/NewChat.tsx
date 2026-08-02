import { useEffect } from 'preact/hooks';
import ErrorBoundary from '@/components/layout/ErrorBoundary';
import { CACHE_KEYS } from '@/data/constants';
import { ChatShellSkeleton } from '@/features/profile/components/layout/ChatShell';
import SearchInput from '@/features/profile/components/ui/SearchInput';
import { apiPostOrFail } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/preact-query';
import { Suspense, useState, type FC } from 'preact/compat';
import useChatProfiles from '../../hooks/useChatProfiles';
import {
    searchNewChatProfilesUrl,
    type SearchNewChatProfilesRequest,
    type SearchNewChatProfilesResponse,
} from '../../services/api/chats';
import convertToContactItemDTO from '../../services/DTO/contactItemDTO';
import ChatShell from '../layout/ChatShell';
import {
    NewChatHeader,
    type ChatTabProps,
    type TabType,
} from '../layout/NewChatDialog';
import { Button } from './Button';
import ContactItem from './ContactItem';

const tabs: { path: TabType; label: string }[] = [
    {
        path: 'mini_chat',
        label: 'Мини-чат (до 16 участников)',
    },
    {
        path: 'secret_chat',
        label: 'Секретный чат',
    },
    {
        path: 'create_contact',
        label: 'Создать контакт',
    },
    {
        path: 'invite',
        label: 'Пригласить в /les',
    },
];

// function useMyContacts() {
//     return useSuspenseQuery({
//         queryKey: [CACHE_KEYS.USER_CHAT_IDS],
//         queryFn: () =>
//             apiPostOrFail<SearchNewChatProfilesResponse>(searchNewChatProfilesUrl, {}),
//         staleTime: CACHE_LIFETIME_MS,
//     });
// }

function useMyContacts() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (search: string) =>
            apiPostOrFail<
                SearchNewChatProfilesResponse,
                SearchNewChatProfilesRequest
            >(searchNewChatProfilesUrl, { search, search_limit: 1000 }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [CACHE_KEYS.USER_CHAT_IDS, CACHE_KEYS.PROFILE_FIELDS],
            });
        },
    });
}

function ChatWrapper() {
    const { mutate: fetchContacts, isPending } = useMyContacts();
    const [query, setQuery] = useState('');
    const [searchedProfileIds, setSearchedProfileIds] = useState<string[]>([]);

    const handleSearchContacts = () => {
        fetchContacts(query, {
            onSuccess: (data) => {
                setSearchedProfileIds(data.contact_profile_ids);
            },
        });
    };

    useEffect(() => {
        handleSearchContacts()

        return () => {
            
        };
    }, []);

    const { data: profileData } = useChatProfiles(searchedProfileIds ?? []);

    console.log(profileData.profile_looks);

    return (
        <ChatShell>
            {profileData.profile_looks.map((contact) => (
                <ContactItem
                    key={contact.target_profile_id}
                    contact={convertToContactItemDTO(contact)}
                    bg="bg-background"
                />
            ))}
        </ChatShell>
    );
}

const NewChat: FC<ChatTabProps> = ({ show, currentTab }) => {
    return (
        <>
            <NewChatHeader
                onClick={() => (show.value = false)}
                headline="Новый чат"
            />

            <div>
                <SearchInput placeholder="Поиск по всем..." />
                <hr class="text-foreground-muted -mx-(--px) mt-2" />
            </div>

            <div>
                <ul class="space-y-2">
                    {tabs.map((tab) => (
                        <li
                            key={tab.path}
                            onClick={() => (currentTab.value = tab.path)}
                        >
                            <Button
                                size="sm"
                                variant="outline"
                                className="w-full text-left"
                            >
                                {tab.label}
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>

            <p class="text-foreground/50 font-medium">Контакты</p>

            <ErrorBoundary>
                <Suspense fallback={<ChatShellSkeleton withTime={true} />}>
                    <ChatWrapper />
                </Suspense>
            </ErrorBoundary>
        </>
    );
};

export default NewChat;
