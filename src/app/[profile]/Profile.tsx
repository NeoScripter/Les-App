import ChatListPanel from '@/features/profile/components/partials/ChatListPanel';
import ChatWindow from '@/features/profile/components/partials/ChatWindow';
import type { CompleteChatInfo } from '@/features/profile/lib/formatters';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import useMediaQuery from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';
import { Signal, useSignal } from '@preact/signals';
import { createContext } from 'preact';
import { useContext } from 'preact/hooks';

const ChatWindowStateContext =
    createContext<Signal<CompleteChatInfo | null> | null>(null);

const Profile = () => {
    const chatWindowState = useSignal<CompleteChatInfo | null>(null);
    const isOnePanelWidth = useMediaQuery('(max-width: 48rem)');
    useEscapeKey(() => (chatWindowState.value = null));

    const shouldShowChatWindow = chatWindowState.value != null;
    const shouldHideChatList = isOnePanelWidth && shouldShowChatWindow;

    return (
        <main className="flex h-full gap-2 p-2 sm:gap-4 sm:p-4">
            <ChatWindowStateContext value={chatWindowState}>
                <ChatListPanel className={cn(shouldHideChatList && 'hidden')} />

                {shouldShowChatWindow && (
                    <ChatWindow />
                )}
            </ChatWindowStateContext>
        </main>
    );
};

export default Profile;

export function useChatWindowState() {
    const ctx = useContext(ChatWindowStateContext);
    if (!ctx) {
        throw new Error(
            'useChatWindowState must be used within ChatWindowStateProvider',
        );
    }
    return ctx;
}
