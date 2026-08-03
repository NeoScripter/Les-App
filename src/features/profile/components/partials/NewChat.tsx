import ErrorBoundary from '@/components/layout/ErrorBoundary';
import Input from '@/features/profile/components/form/Input';
import ChatListShell, {
    ChatListShellSkeleton,
} from '@/features/profile/components/layout/ChatListShell';
import { useSignal } from '@preact/signals';
import { Suspense, type FC } from 'preact/compat';
import useChatProfiles from '../../hooks/useChatProfiles';
import useMyContacts from '../../hooks/useMyContacts';
import convertToContactItemDTO from '../../services/DTO/contactItemDTO';
import {
    NewChatHeader,
    type ChatTabProps,
    type TabType,
} from './NewChatDialog';
import { Button } from '@/features/profile/components/ui/Button';
import ContactItem from '@/features/profile/components/ui/ContactItem';

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

type ContactListProps = {
    query: string;
};

function ContactList({ query }: ContactListProps) {
    const { data: contactData } = useMyContacts({ query });

    const profileData = useChatProfiles(
        contactData?.contact_profile_ids.slice(14) ?? [],
    );

    const profiles = profileData.profile_looks;

    return (
        <ChatListShell
            isEmpty={profiles.length === 0}
            emptyText="По вашему запросу не найдено контактов"
        >
            {profiles.map((contact) => (
                <ContactItem
                    key={contact.target_profile_id}
                    contact={convertToContactItemDTO(contact)}
                    bg="bg-background"
                />
            ))}
        </ChatListShell>
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
                <Input
                    query={query}
                    placeholder="Поиск по всем..."
                    className="mb-2"
                />
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
                <Suspense fallback={<ChatListShellSkeleton withTime={true} />}>
                    <ContactList query={query.value} />
                </Suspense>
            </ErrorBoundary>
        </>
    );
};

export default NewChat;
