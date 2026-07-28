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
import { Signal, useSignal } from '@preact/signals';
import { CheckCheck, Ellipsis, Plus, Trash2 } from 'lucide-preact';
import { Suspense } from 'preact/compat';

const Profile = () => {
    const showChatMenu = useSignal(false);
    const selectedChatIds = useSignal<number[] | null>(null);

    const selectedIds = selectedChatIds.value;
    const isSelecting = selectedIds !== null;

    const handleDeleteSelectedChats = () => {
        alert('Not implemented yet');
        selectedChatIds.value = null;
    };

    return (
        <main className="h-full">
            <MenuLayout className="h-[calc(100svh-(var(--margin)*2))] [--margin:0.5rem] sm:[--margin:1rem]">
                <MenuHeader>
                    {isSelecting ? (
                        <>
                            <Button
                                disabled={selectedIds.length === 0}
                                className="bg-accent"
                                onClick={handleDeleteSelectedChats}
                                variant="icon"
                            >
                                <Trash2 />
                            </Button>
                            <Headline as="h1">
                                Выбрано: {selectedIds.length}
                            </Headline>
                            <Button
                                onClick={() => (selectedChatIds.value = null)}
                                className="bg-primary"
                                variant="icon"
                            >
                                <CheckCheck />
                            </Button>
                        </>
                    ) : (
                        <>
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
                        </>
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

type PopoverProps = {
    chatIds: Signal<number[] | null>;
};

function Popover({ chatIds }: PopoverProps) {
    const handleReadAllChats = () => {
        alert('Not implemented yet');
        chatIds.value = null;
    };

    return (
        <div
            id="profile-popover"
            popover
            class="bg-background-accent rounded-primary border-foreground-muted w-full max-w-40 border text-inherit shadow-md"
        >
            <ul class="divide-foreground-muted/50 divide-y">
                <li>
                    <Button
                        onClick={() => (chatIds.value = [])}
                        className="w-full"
                        size="sm"
                        variant="ghost"
                    >
                        Выбрать
                    </Button>
                </li>
                <li>
                    <Button
                        onClick={handleReadAllChats}
                        className="w-full"
                        size="sm"
                        variant="ghost"
                    >
                        Прочитать все
                    </Button>
                </li>
            </ul>
        </div>
    );
}
