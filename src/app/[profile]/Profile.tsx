import { useEscapeKey } from '@/hooks/useEscapeKey';
import useMediaQuery from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';
import { Signal, useSignal } from '@preact/signals';
import { createContext } from 'preact';
import { useContext } from 'preact/hooks';
import ChatListPanel from './partials/ChatListPanel';
import ChatWindow from './partials/ChatWindow';

const ChatWindowStateContext = createContext<Signal<boolean> | null>(null);

const Profile = () => {
    const showChatWindow = useSignal<boolean>(false);
    const isOnePanelWidth = useMediaQuery('(max-width: 48rem)');
    useEscapeKey(() => (showChatWindow.value = false));

    const shouldHideChatList = isOnePanelWidth && showChatWindow.value === true;

    const shouldShowChatWindow = showChatWindow.value === true;

    return (
        <main className="flex h-full gap-2 p-2 sm:gap-4 sm:p-4">
            <ChatWindowStateContext value={showChatWindow}>
                <ChatListPanel className={cn(shouldHideChatList && 'hidden')} />

                {shouldShowChatWindow && <ChatWindow />}
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
