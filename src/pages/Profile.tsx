import ChatList from '@/components/ChatList';
import ErrorBoundary from '@/components/ErrorBoundary';
import Headline from '@/components/Headline';
import { ChatShellSkeleton } from '@/features/profile/components/layout/ChatShell';
import MenuHeader from '@/features/profile/components/layout/MenuHeader';
import NewChatDialog from '@/features/profile/components/layout/NewChatDialog';
import PrimaryNav from '@/features/profile/components/layout/PrimaryNav';
import SecondaryNav from '@/features/profile/components/layout/SecondaryNav';
import { Button } from '@/features/profile/components/ui/Button';
import FramedIconBtn from '@/features/profile/components/ui/FramedIconBtn';
import SearchInput from '@/features/profile/components/ui/SearchInput';
import { navItems } from '@/features/profile/data/secondaryNavItems';
import MenuLayout from '@/layouts/MenuLayout';
import { useSignal } from '@preact/signals';
import { Ellipsis, Plus } from 'lucide-preact';
import { Suspense } from 'preact/compat';

const Profile = () => {
    const showChatMenu = useSignal(false);

    return (
        <main className="h-full">
            <MenuLayout className="h-[calc(100svh-(var(--margin)*2))] [--margin:0.5rem] sm:[--margin:1rem]">
                <MenuHeader>
                    <FramedIconBtn
                        popovertarget="profile-popover"
                        style="anchor-name: --profile;"
                        icon={Ellipsis}
                        variant="ghost"
                    />
                    <Headline as="h1">Личка</Headline>
                    <FramedIconBtn
                        icon={Plus}
                        onClick={() => (showChatMenu.value = true)}
                    />
                </MenuHeader>

                <Popover />

                <div>
                    <SearchInput placeholder="Поиск по чатам..." />

                    <SecondaryNav items={navItems} />
                </div>
                <ErrorBoundary>
                    <Suspense fallback={<ChatShellSkeleton withTime={true} />}>
                        <ChatList />
                    </Suspense>
                </ErrorBoundary>

                <NewChatDialog show={showChatMenu} />

                <PrimaryNav />
            </MenuLayout>
        </main>
    );
};

export default Profile;

function Popover() {
    return (
        <div
            id="profile-popover"
            popover
            class="bg-background-accent rounded-primary border-foreground-muted w-full max-w-40 border text-inherit shadow-md"
        >
            <ul class="divide-foreground-muted/50 divide-y">
                <li>
                    <Button className="w-full" size="sm" variant="ghost">
                        Выбрать
                    </Button>
                </li>
                <li>
                    <Button className="w-full" size="sm" variant="ghost">
                        Прочитать все
                    </Button>
                </li>
            </ul>
        </div>
    );
}
