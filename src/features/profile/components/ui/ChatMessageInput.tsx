import { useChatWindowState } from '@/app/[profile]/Profile';
import { isBlankString } from '@/lib/utils';
import { useSignal } from '@preact/signals';
import {
    Mic,
    Paperclip,
    SendHorizonal,
    Video,
    type LucideIcon,
} from 'lucide-preact';
import type { ComponentProps } from 'preact/compat';
import useSendMessage from '../../hooks/useSendMessage';
import type { CompleteChatInfo } from '../../lib/formatters';
import { type SendMessageBlock } from '../../services/api/chats';
import ChatTextarea from '../form/ChatTextarea';
import ChatFileUploader from '../partials/ChatFileUploader';

export type SendMessageProps = {
    chatId: string;
    profileId: string;
    blocks: SendMessageBlock[];
};

const ChatMessageInput = () => {
    const chatWindowState = useChatWindowState();
    const windowState = chatWindowState.value as CompleteChatInfo;
    const showFileUploader = useSignal(false);

    const message = useSignal<string>('');

    const { mutate: sendMessage } = useSendMessage();

    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault();

        const rawMessage = message.value;

        if (isBlankString(rawMessage)) {
            return;
        }

        const normalizedMessage = message.value.trim();

        const args: SendMessageProps = {
            chatId: windowState.chat_id,
            profileId: windowState.profile_id,
            blocks: [{ type: 'text', content_text: normalizedMessage }],
        };

        message.value = '';
        sendMessage(args, {
            onError: () => {
                message.value = normalizedMessage;
            },
        });
    };

    return (
        <div
            class="flex shrink-0 flex-col"
            style={{
                maxHeight: showFileUploader.value ? 'calc(20% + 178px)' : '20%',
            }}
        >
            <ChatFileUploader show={showFileUploader} />
            <form
                onSubmit={handleSubmit}
                class="flex items-end gap-2"
                style={{
                    maxHeight: showFileUploader.value
                        ? 'calc(100% - 178px - 1.5rem)'
                        : '100%',
                }}
            >
                <Button
                    onClick={() =>
                        (showFileUploader.value = !showFileUploader.value)
                    }
                    icon={Paperclip}
                />

                <ChatTextarea
                    placeholder="Сообщение..."
                    value={message.value}
                    onInput={(e) => (message.value = e.target.value)}
                    className="field-sizing-content max-h-full min-h-6 w-full resize-none overflow-y-auto px-1 text-base"
                />

                <div class="flex flex-col items-end justify-between gap-2">
                    {message.value !== '' ? (
                        <Button icon={SendHorizonal} />
                    ) : (
                        <RecordButton />
                    )}
                </div>
            </form>
        </div>
    );
};

export default ChatMessageInput;

type ButtonProps = {
    icon: LucideIcon;
} & ComponentProps<'button'>;

const Button = ({ icon, ...props }: ButtonProps) => {
    const Icon = icon;

    return (
        <button class="size-6" {...props}>
            <Icon class="size-full" />
        </button>
    );
};

const RecordButton = () => {
    const recordingMode = useSignal<'audio' | 'video'>('audio');

    return recordingMode.value === 'audio' ? (
        <Button onClick={() => (recordingMode.value = 'video')} icon={Mic} />
    ) : (
        <Button onClick={() => (recordingMode.value = 'audio')} icon={Video} />
    );
};
