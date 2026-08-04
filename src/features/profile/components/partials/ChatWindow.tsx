import ErrorBoundary from '@/components/layout/ErrorBoundary';
import PanelLayout from '@/components/layout/PanelLayout';
import Headline from '@/components/ui/Headline';
import Hex from '@/components/ui/Hex';
import PanelHeader from '@/features/profile/components/layout/PanelHeader';
import ChatMessages, {
    ChatMessagesSkeleton,
} from '@/features/profile/components/partials/ChatMessages';
import getAvatarStyle from '@/features/profile/data/avatarStyles';
import type { CompleteChatInfo } from '@/features/profile/lib/formatters';
import convertToContactItemDTO from '@/features/profile/services/DTO/contactItemDTO';
import type { Signal } from '@preact/signals';
import { AudioLines, ChevronLeft } from 'lucide-preact';
import { Suspense, useMemo, type FC } from 'preact/compat';
import ChatMessageInput from '../ui/ChatMessageInput';

type Props = {
    chatWindowState: Signal<CompleteChatInfo | null>;
};

const ChatWindow: FC<Props> = ({ chatWindowState }) => {
    const windowState = chatWindowState.value as CompleteChatInfo;

    const styles = useMemo(() => getAvatarStyle(), []);
    const colors = {
        color: styles.color,
        backgroundColor: styles.backgroundColor,
    };

    const personData = convertToContactItemDTO(windowState);

    return (
        <PanelLayout className="flex w-full flex-1 flex-col gap-2">
            <PanelHeader className="my-1 sm:my-2">
                <button
                    type="button"
                    onClick={() => (chatWindowState.value = null)}
                    class="size-10"
                >
                    <ChevronLeft />
                </button>

                <div class="flex items-center gap-3">
                    <Hex
                        styles={{ ...colors }}
                        className="relative h-10"
                        as="figure"
                    >
                        <span className="text-xs font-bold">
                            {personData.initials}
                        </span>
                    </Hex>
                    <Headline className="text-base">{personData.name}</Headline>
                </div>
                <button type="button" class="size-10">
                    <AudioLines />
                </button>
            </PanelHeader>

            <div class="scrollbar-hidden basis-full overflow-y-auto">
                <ErrorBoundary>
                    <Suspense fallback={<ChatMessagesSkeleton />}>
                        <ChatMessages windowState={windowState} />
                    </Suspense>
                </ErrorBoundary>
            </div>

            <ChatMessageInput />

        </PanelLayout>
    );
};

export default ChatWindow;
