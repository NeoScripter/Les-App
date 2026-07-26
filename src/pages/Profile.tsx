import ChatList from '@/components/ContactList';
import ErrorBoundary from '@/components/ErrorBoundary';
import Headline from '@/components/Headline';
import SecondaryNav from '@/features/profile/components/layout/SecondaryNav';
import FramedIconBtn from '@/features/profile/components/ui/FramedIconBtn';
import { navItems } from '@/features/profile/data/secondaryNavItems';
import ChatLayout from '@/layouts/ChatLayout';
import { Ellipsis, Plus } from 'lucide-preact';
import { Suspense } from 'preact/compat';

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
            <ErrorBoundary>
                <Suspense fallback={<div>Загрузка...</div>}>
                    <ChatList />
                </Suspense>
            </ErrorBoundary>
        </ChatLayout>
    );
};

export default Profile;
