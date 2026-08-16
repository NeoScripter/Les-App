import { useChatWindowState } from '@/app/[profile]/Profile';
import type { SendMessageProps } from '@/features/profile/components/ui/ChatMessageInput';
import FramedIconBtn from '@/features/profile/components/ui/FramedIconBtn';
import useSendMessage from '@/features/profile/hooks/useSendMessage';
import {
    createContainer,
    populateContainer,
} from '@/features/profile/lib/fetchers';
import type { CompleteChatInfo } from '@/features/profile/lib/formatters';
import { cn } from '@/lib/utils';
import type { Signal } from '@preact/signals';
import { File, X } from 'lucide-preact';

type Props = {
    show: Signal<boolean>;
};

const ChatFileUploader = ({ show }: Props) => {
    const { mutate: sendMessage } = useSendMessage();
    const chatWindowState = useChatWindowState();
    const windowState = chatWindowState.value as CompleteChatInfo;

    const handleFileUpload = async (e: InputEvent) => {
        const input = e.currentTarget as HTMLInputElement;
        if (!input.files) return;

        const containerId = await createContainer();

        const newFiles = await populateContainer(input.files, containerId);

        const args: SendMessageProps = {
            chatId: windowState.chat_id,
            profileId: windowState.profile_id,
            blocks: newFiles,
        };

        input.value = '';
        show.value = false;
        sendMessage(args, {
            onError: () => {
                console.log('error');
            },
        });
    };

    return (
        <article
            class={cn(
                'border-foreground-muted rounded-primary mb-6 border bg-black p-2',
                show.value === false && 'hidden',
            )}
        >
            <header class="flex items-center justify-between gap-2">
                <FramedIconBtn
                    onClick={() => (show.value = false)}
                    icon={X}
                    variant="ghost"
                />
                <span>
                    <File class="text-foreground-muted mr-1 size-6" />
                </span>
            </header>
            <hr class="text-foreground-muted -mx-2 my-2" />
            <div class="flex flex-col items-center justify-center gap-3 py-4">
                <label class="bg-foreground-muted text-foreground rounded-primary cursor-pointer px-4 py-3 text-sm font-medium transition-opacity hover:opacity-80">
                    Выбрать файлы
                    <input
                        onInput={handleFileUpload}
                        type="file"
                        class="sr-only"
                        multiple
                    />
                </label>
                <p class="text-foreground/75 text-xs">
                    Любые документы и архивы без сжатия
                </p>
            </div>
        </article>
    );
};

export default ChatFileUploader;
