import ChatList from '@/features/profile/components/ui/ChatList';
import ErrorBoundary from '@/components/layout/ErrorBoundary';
import { ChatShellSkeleton } from '@/features/profile/components/layout/ChatShell';
import MenuHeader from '@/features/profile/components/layout/MenuHeader';
import NewChatDialog from '@/features/profile/components/layout/NewChatDialog';
import PrimaryNav from '@/features/profile/components/layout/PrimaryNav';
import SecondaryNav from '@/features/profile/components/layout/SecondaryNav';
import DefaultToolbar from '@/features/profile/components/ui/DefaultToolbar';
import Popover from '@/features/profile/components/ui/Popover';
import SearchInput from '@/features/profile/components/ui/SearchInput';
import SelectionToolbar from '@/features/profile/components/ui/SelectionToolbar';
import { navItems } from '@/features/profile/data/secondaryNavItems';
import MenuLayout from '@/components/layout/MenuLayout';
import { useSignal } from '@preact/signals';
import { Suspense } from 'preact/compat';

const Profile = () => {
    const showChatMenu = useSignal(false);
    const selectedChatIds = useSignal<string[] | null>(null);

    const isSelecting = selectedChatIds.value !== null;

    return (
        <main className="h-full">
            <MenuLayout className="h-[calc(100svh-(var(--margin)*2))] [--margin:0.5rem] sm:[--margin:1rem]">
                <MenuHeader>
                    {isSelecting ? (
                        <SelectionToolbar selectedIds={selectedChatIds} />
                    ) : (
                        <DefaultToolbar showMenu={showChatMenu} />
                    )}
                </MenuHeader>

                {!isSelecting && <Popover chatIds={selectedChatIds} />}

                <div>
                    <SearchInput placeholder="Поиск по чатам..." />

                    <SecondaryNav items={navItems} />
                </div>
                <ErrorBoundary>
                    <Suspense fallback={<ChatShellSkeleton withTime={true} />}>
                        <ChatList selectedChatIds={selectedChatIds} />
                    </Suspense>
                </ErrorBoundary>

                <NewChatDialog show={showChatMenu} />

                <PrimaryNav />
            </MenuLayout>
        </main>
    );
};

export default Profile;
