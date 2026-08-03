import ErrorBoundary from '@/components/layout/ErrorBoundary';
import PanelLayout from '@/components/layout/PanelLayout';
import Headline from '@/components/ui/Headline';
import Hex from '@/components/ui/Hex';
import Input from '@/features/profile/components/form/Input';
import ChatMessagesShell, {
    ChatMessagesShellSkeleton,
} from '@/features/profile/components/layout/ChatMessagesShell';
import PanelHeader from '@/features/profile/components/layout/PanelHeader';
import FramedIconBtn from '@/features/profile/components/ui/FramedIconBtn';
import getAvatarStyle from '@/features/profile/data/avatarStyles';
import type { CompleteChatInfo } from '@/features/profile/lib/formatters';
import convertToContactItemDTO from '@/features/profile/services/DTO/contactItemDTO';
import type { Signal } from '@preact/signals';
import { AudioLines, ChevronLeft, Mic, Paperclip, Video } from 'lucide-preact';
import { Suspense, useMemo, type FC } from 'preact/compat';

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
        <PanelLayout className="flex w-full flex-1 flex-col">
            <PanelHeader>
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

            <ErrorBoundary>
                <Suspense fallback={<ChatMessagesShellSkeleton />}>
                    <ChatMessagesShell windowState={windowState} />
                </Suspense>
            </ErrorBoundary>

            <div class="flex items-center gap-2">
                <FramedIconBtn variant="ghost" size="lg" icon={Paperclip} />
                <Input placeholder="Сообщение..." className="h-12 text-lg" />

                <FramedIconBtn variant="ghost" size="lg" icon={Video} />
                <FramedIconBtn variant="ghost" size="lg" icon={Mic} />
            </div>
        </PanelLayout>
    );
};

export default ChatWindow;
