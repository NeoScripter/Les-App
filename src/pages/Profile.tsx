import Nav from '@/features/profile/components/layout/Nav';
import Button from '@/features/profile/components/ui/Button';
import ContactItem from '@/features/profile/components/ui/ContactItem';
import { contacts } from '@/features/profile/data/contacts';
import { navItems } from '@/features/profile/data/navItems';
import ChatLayout from '@/layouts/ChatLayout';
import { Ellipsis, Plus } from 'lucide-preact';

const Profile = () => {
    return (
        <ChatLayout className="flex h-[calc(100svh-(var(--margin)*2))] flex-col [--margin:0.5rem] sm:[--margin:1rem]">
            <header class="mt-1 flex items-center justify-between gap-2 sm:mt-2">
                <Button>
                    <Ellipsis class="translate-x-[5%]" />
                </Button>
                <h1 class="text-xl font-semibold">Личка</h1>
                <Button type="filled">
                    <Plus />
                </Button>
            </header>

            <div>
                <input
                    type="search"
                    class="border-foreground-muted mb-2 w-full rounded-primary border px-2 py-1"
                    placeholder="Поиск по чатам..."
                />

                <Nav items={navItems} />
            </div>
            <ul class="overflow-y-auto scrollbar-hidden">
                {contacts
                    .toSorted((a, b) => b.time.localeCompare(a.time))
                    .map((contact) => (
                        <ContactItem key={contact.id} contact={contact} />
                    ))}
            </ul>
        </ChatLayout>
    );
};

export default Profile;
