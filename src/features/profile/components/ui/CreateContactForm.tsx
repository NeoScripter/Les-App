import { CACHE_KEYS } from '@/data/constants';
import ChatListShell from '@/features/profile/components/layout/ChatListShell';
import ContactItem from '@/features/profile/components/ui/ContactItem';
import { apiPostOrFail } from '@/lib/api';
import { useMutation } from '@tanstack/preact-query';
import type { FC } from 'preact/compat';
import convertToContactItemDTO from "@/features/profile/services/DTO/contactItemDTO";
import {
    addUserToContactsUrl,
    type AddUserToContactsRequest,
    type AddUserToContactsResponse,
    type ProfileFields,
} from "@/features/profile/services/api/chats";
import Input from "@/features/profile/components/form/Input";
import { useChatMenu } from "@/features/profile/components/partials/ChatListPanel";
import { Button } from './Button';

type UserData = Omit<
    AddUserToContactsRequest['naming'],
    'long_text' | 'long_text_only'
>;

function useAddContact() {
    return useMutation({
        mutationFn: ({
            targetId,
            userData,
        }: {
            targetId: string;
            userData: UserData;
        }) =>
            apiPostOrFail<AddUserToContactsResponse, AddUserToContactsRequest>(
                addUserToContactsUrl,
                {
                    profile_id: null,
                    target_profile_id: targetId,
                    naming: {
                        long_text_only: false,
                        long_text: null,
                        ...userData,
                    },
                },
            ),
        onSuccess: (_data, _variables, _onMutateResult, context) => {
            context.client.invalidateQueries({
                queryKey: [CACHE_KEYS.USER_CHAT_IDS],
            });
        },
    });
}

const CreateContactForm: FC<{
    selectedContact: ProfileFields;
}> = ({ selectedContact }) => {
    const { mutate: addContact } = useAddContact();
    const showChatMenu = useChatMenu();

    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault();

        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);

        const data = {
            first_name: formData.get('first_name') as string,
            last_name: formData.get('last_name') as string,
            short_description: formData.get('short_description') as string,
        };

        addContact(
            { targetId: selectedContact.target_profile_id, userData: data },
            { onSuccess: () => (showChatMenu.value = false) },
        );
    };

    return (
        <>
            <ChatListShell>
                <ContactItem
                    contact={convertToContactItemDTO(selectedContact)}
                    bg="bg-background"
                />
            </ChatListShell>
            <hr class="text-foreground-muted -mx-(--px) mt-2" />
            <form onSubmit={handleSubmit} class="mt-2 space-y-3">
                <Input placeholder="Введите имя" name="first_name" />
                <Input placeholder="Введите фамилию" name="last_name" />
                <Input
                    placeholder="Введите описание"
                    name="short_description"
                />
                <Button variant="primary" className="font-medium">
                    Добавить
                </Button>
            </form>
        </>
    );
};

export default CreateContactForm;
