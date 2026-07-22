import Headline from '@/components/Headline';
import SecondaryNav from '@/features/profile/components/layout/SecondaryNav';
import ContactItem from '@/features/profile/components/ui/ContactItem';
import FramedIconBtn from '@/features/profile/components/ui/FramedIconBtn';
import { contacts } from '@/features/profile/data/contacts';
import { navItems } from '@/features/profile/data/secondaryNavItems';
import ChatLayout from '@/layouts/ChatLayout';
import { Ellipsis, Plus } from 'lucide-preact';

const Profile = () => {
    return (
        <ChatLayout className="flex h-[calc(100svh-(var(--margin)*2))] flex-col [--margin:0.5rem] sm:[--margin:1rem]">
            <header class="mt-1 flex items-center justify-between gap-2 sm:mt-2">
                <FramedIconBtn icon={Ellipsis} variant="ghost" />
                <Headline>Личка</Headline>
                <FramedIconBtn icon={Plus} />
            </header>

            <div>
                <input
                    type="search"
                    class="border-foreground-muted rounded-primary mb-2 w-full border px-3 py-1"
                    placeholder="Поиск по чатам..."
                />

                <SecondaryNav items={navItems} />
            </div>
            <ul class="scrollbar-hidden overflow-y-auto">
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
