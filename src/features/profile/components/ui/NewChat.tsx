import Headline from '@/components/Headline';
import { ChevronLeft } from 'lucide-preact';
import type { FC } from 'preact/compat';
import { contacts } from '../../data/contacts';
import ChatShell from '../layout/ChatShell';
import MenuHeader from '../layout/MenuHeader';
import type { ChatTabProps, TabType } from '../layout/NewChatDialog';
import ContactItem from './ContactItem';
import FramedIconBtn from './FramedIconBtn';
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
            <MenuHeader>
                <span class="flex-1">
                    <FramedIconBtn
                        onClick={() => (show.value = false)}
                        icon={ChevronLeft}
                        className="[&_svg:last-of-type]:size-6 [&_svg:last-of-type]:-translate-x-1/20"
                        variant="ghost"
                    />
                </span>
                <Headline as="h3">Новый чат</Headline>
                <span class="flex-1" />
            </MenuHeader>

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
                            <button class="rounded-primary border-foreground-muted text-left font-medium group hover:text-foreground-accent relative isolate w-full border px-3 py-2 text-sm transition-colors">
                                {tab.label}
                                <span class="bg-linear-primary absolute inset-0 -z-1 opacity-0 transition-opacity group-hover:opacity-100" />
                            </button>
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
