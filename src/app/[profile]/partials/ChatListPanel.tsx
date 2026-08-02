import ErrorBoundary from '@/components/layout/ErrorBoundary';
import PanelLayout from '@/components/layout/PanelLayout';
import Input from '@/features/profile/components/form/Input';
import { ChatShellSkeleton } from '@/features/profile/components/layout/ChatShell';
import PanelHeader from '@/features/profile/components/layout/PanelHeader';
import NewChatDialog from '@/features/profile/components/layout/NewChatDialog';
import PrimaryNav from '@/features/profile/components/layout/PrimaryNav';
import SecondaryNav from '@/features/profile/components/layout/SecondaryNav';
import ChatList from '@/features/profile/components/ui/ChatList';
import DefaultToolbar from '@/features/profile/components/ui/DefaultToolbar';
import Popover from '@/features/profile/components/ui/Popover';
import SelectionToolbar from '@/features/profile/components/ui/SelectionToolbar';
import { navItems } from '@/features/profile/data/secondaryNavItems';
import { useSignal } from '@preact/signals';
import { Suspense, type FC } from 'preact/compat';

const ChatListPanel: FC<{ className?: string }> = ({ className }) => {
    const showChatMenu = useSignal(false);
    const selectedChatIds = useSignal<string[] | null>(null);

    const isSelecting = selectedChatIds.value !== null;

    return (
        <PanelLayout>
            <PanelHeader>
                {isSelecting ? (
                    <SelectionToolbar selectedIds={selectedChatIds} />
                ) : (
                    <DefaultToolbar showMenu={showChatMenu} />
                )}
            </PanelHeader>

            {!isSelecting && <Popover chatIds={selectedChatIds} />}

            <div>
                <Input placeholder="Поиск по чатам..." className="mb-2" />

                <SecondaryNav items={navItems} />
            </div>
            <ErrorBoundary>
                <Suspense fallback={<ChatShellSkeleton withTime={true} />}>
                    <ChatList selectedChatIds={selectedChatIds} />
                </Suspense>
            </ErrorBoundary>

            <NewChatDialog show={showChatMenu} />

            <PrimaryNav />
        </PanelLayout>
    );
};

export default ChatListPanel;
