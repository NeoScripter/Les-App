import { createContext } from 'preact';
import { useContext } from 'preact/hooks';
import { Signal, signal } from '@preact/signals';

interface SelectedChatIdsContextValue {
    showSelectedChatIds: Signal<boolean>;
}

const SelectedChatIdsContext = createContext<SelectedChatIdsContextValue | null>(null);

export function useSelectedChatIds() {
    const ctx = useContext(SelectedChatIdsContext);
    if (!ctx) {
        throw new Error('useSelectedChatIds must be used within SelectedChatIdsProvider');
    }
    return ctx;
}

export function SelectedChatIdsProvider({ children }: { children: preact.ComponentChildren }) {
    const showSelectedChatIds = signal(false);
    return (
        <SelectedChatIdsContext.Provider value={{ showSelectedChatIds }}>
            {children}
        </SelectedChatIdsContext.Provider>
    );
}
