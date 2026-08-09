import ErrorBoundary from '@/components/layout/ErrorBoundary';
import PanelLayout from '@/components/layout/PanelLayout';
import Input from '@/features/profile/components/form/Input';
import { ChatListShellSkeleton } from '@/features/profile/components/layout/ChatListShell';
import PanelHeader from '@/features/profile/components/layout/PanelHeader';
import PrimaryNav from '@/features/profile/components/layout/PrimaryNav';
import SecondaryNav from '@/features/profile/components/layout/SecondaryNav';
import COntactHub from '@/features/profile/components/partials/ContactHub';
import ChatList from '@/features/profile/components/ui/ChatList';
import DefaultToolbar from '@/features/profile/components/ui/DefaultToolbar';
import Popover from '@/features/profile/components/ui/Popover';
import SelectionToolbar from '@/features/profile/components/ui/SelectionToolbar';
import { navItems } from '@/features/profile/data/secondaryNavItems';
import { cn } from '@/lib/utils';
import { Signal, useSignal } from '@preact/signals';
import { createContext, Suspense, useContext, type FC } from 'preact/compat';

const ChatListPanel: FC<{ className?: string }> = ({ className }) => {
    const showChatMenu = useSignal(false);
    const selectedChatIds = useSignal<string[] | null>(null);

    const isSelecting = selectedChatIds.value !== null;

    return (
        <PanelLayout className={cn('flex-1', className)}>
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
                <Suspense fallback={<ChatListShellSkeleton withTime={true} />}>
                    <ChatList selectedChatIds={selectedChatIds} />
                </Suspense>
            </ErrorBoundary>

            <ChatMenuContext value={showChatMenu}>
                <COntactHub show={showChatMenu} />
            </ChatMenuContext>

            <PrimaryNav />
        </PanelLayout>
    );
};

export default ChatListPanel;

const ChatMenuContext = createContext<Signal<boolean> | null>(null);

export function useChatMenu() {
    const ctx = useContext(ChatMenuContext);
    if (!ctx) {
        throw new Error('useChatMenu must be used within ChatMenuProvider');
    }
    return ctx;
}
