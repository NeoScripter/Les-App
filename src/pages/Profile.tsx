import Button from '@/features/profile/components/Button';
import Nav from '@/features/profile/components/layout/Nav';
import { navItems } from '@/features/profile/data/navItems';
import ChatLayout from '@/layouts/ChatLayout';
import { Ellipsis, Plus } from 'lucide-preact';

const Profile = () => {
    return (
        <ChatLayout>
            <header class="mt-1 flex items-center justify-between gap-2 sm:mt-2">
                <Button>
                    <Ellipsis class="translate-x-[5%]" />
                </Button>
                <h1 class="text-lg font-semibold">Личка</h1>
                <Button type="filled">
                    <Plus />
                </Button>
            </header>

            <div>
                <input
                    type="search"
                    class="border-foreground-muted mb-2 w-full rounded-sm border px-2 py-1"
                    placeholder="Поиск по чатам..."
                />

                <Nav items={navItems} />
            </div>
            <span>hi</span>
        </ChatLayout>
    );
};

export default Profile;
