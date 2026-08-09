import ErrorBoundary from '@/components/layout/ErrorBoundary';
import Input from '@/features/profile/components/form/Input';
import ChatListShell, {
    ChatListShellSkeleton,
} from '@/features/profile/components/layout/ChatListShell';
import ContactItem from '@/features/profile/components/ui/ContactItem';
import { Signal, useSignal } from '@preact/signals';
import { Suspense, type FC } from 'preact/compat';
import useChatProfiles from "@/features/profile/hooks/useChatProfiles";
import useMyContacts from "@/features/profile/hooks/useMyContacts";
import type { ProfileFields } from "@/features/profile/services/api/chats";
import convertToContactItemDTO from "@/features/profile/services/DTO/contactItemDTO";
import CreateContactForm from "@/features/profile/components/ui/CreateContactForm";
import { ContactHubHeader, type ChatTabProps } from './ContactHub';

type ContactListProps = {
    query: Signal<string>;
    selectedContact: Signal<ProfileFields | null>;
};

function ContactList({ query, selectedContact }: ContactListProps) {
    const { data: contactData } = useMyContacts({ query: query.value });

    const profileData = useChatProfiles(
        contactData?.profile_ids.slice(14) ?? [],
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
                    onClick={() => {
                        selectedContact.value = contact;
                        query.value = '';
                    }}
                    bg="bg-background"
                />
            ))}
        </ChatListShell>
    );
}

const CreateContact: FC<ChatTabProps> = ({ currentTab }) => {
    const query = useSignal<string>('');
    const selectedContact = useSignal<ProfileFields | null>(null);

    return (
        <>
            <ContactHubHeader
                onClick={() => (currentTab.value = 'new_chat')}
                headline="Создать контакт"
            />
            <div>
                {selectedContact.value == null ? (
                    <>
                        <label>
                            <p class="text-foreground/50 font-medium">
                                Контакты
                            </p>

                            <Input
                                placeholder="Поиск по нику..."
                                className="my-2"
                                value={query.value}
                                onInput={(e) => (query.value = e.target.value)}
                            />
                        </label>
                        <hr class="text-foreground-muted -mx-(--px) mt-2" />
                    </>
                ) : (
                    <CreateContactForm
                        selectedContact={selectedContact.value}
                    />
                )}
            </div>

            {query.value.length > 0 && (
                <ErrorBoundary>
                    <Suspense
                        fallback={<ChatListShellSkeleton withTime={true} />}
                    >
                        <ContactList
                            query={query}
                            selectedContact={selectedContact}
                        />
                    </Suspense>
                </ErrorBoundary>
            )}
        </>
    );
};

export default CreateContact;
