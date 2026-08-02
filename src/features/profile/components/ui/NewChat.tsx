import ErrorBoundary from '@/components/layout/ErrorBoundary';
import { CACHE_KEYS, CACHE_LIFETIME_MS } from '@/data/constants';
import { ChatShellSkeleton } from '@/features/profile/components/layout/ChatShell';
import SearchInput from '@/features/profile/components/ui/SearchInput';
import { apiPostOrFail } from '@/lib/api';
import { useSignal } from '@preact/signals';
import {
    useMutation,
    useQueryClient,
    useSuspenseQuery,
} from '@tanstack/preact-query';
import { Suspense, type FC } from 'preact/compat';
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

function useMyContacts({ query }: { query: string }) {
    return useSuspenseQuery({
        queryKey: [CACHE_KEYS.USER_CONTACTS, query],
        queryFn: () =>
            apiPostOrFail<
                SearchNewChatProfilesResponse,
                SearchNewChatProfilesRequest
            >(searchNewChatProfilesUrl, { search: query, search_limit: 1000 }),
        staleTime: CACHE_LIFETIME_MS,
    });
}

type WrapperProps = {
    query: string;
};

function ChatWrapper({ query }: WrapperProps) {
    const { data: contactData } = useMyContacts({ query });

    const { data: profileData } = useChatProfiles(
        contactData?.contact_profile_ids ?? [],
    );

    const profiles = profileData.profile_looks;

    return (
        <ChatShell isEmpty={profiles.length === 0}>
            {profiles.map((contact) => (
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
    const query = useSignal<string>('');

    return (
        <>
            <NewChatHeader
                onClick={() => (show.value = false)}
                headline="Новый чат"
            />

            <div>
                <SearchInput query={query} placeholder="Поиск по всем..." />
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
                    <ChatWrapper query={query.value} />
                </Suspense>
            </ErrorBoundary>
        </>
    );
};

export default NewChat;
