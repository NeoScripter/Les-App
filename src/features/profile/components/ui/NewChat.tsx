import type { FC } from 'preact/compat';
import { contacts } from '../../data/contacts';
import ChatShell from '../layout/ChatShell';
import {
    NewChatHeader,
    type ChatTabProps,
    type TabType,
} from '../layout/NewChatDialog';
import { Button } from './Button';
import ContactItem from './ContactItem';
import SearchInput from './SearchInput';

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
                                class="w-full text-left"
                            >
                                {tab.label}
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>

            <p class="text-foreground/50 font-medium">Контакты</p>

            <ChatShell>
                {contacts.map((contact) => (
                    <ContactItem
                        key={contact.id}
                        bg="bg-background"
                        {...contact}
                    />
                ))}
            </ChatShell>
        </>
    );
};

export default NewChat;
