import { useChatWindowState } from '@/app/[profile]/Profile';
import { CACHE_KEYS } from '@/data/constants';
import { apiPostOrFail } from '@/lib/api';
import { useSignal } from '@preact/signals';
import { useMutation } from '@tanstack/preact-query';
import {
    Mic,
    Paperclip,
    SendHorizonal,
    Video,
    type LucideIcon,
} from 'lucide-preact';
import type { ComponentProps } from 'preact/compat';
import type { CompleteChatInfo } from '../../lib/formatters';
import { insertAtCursor } from '../../lib/utils';
import {
    sendMessageUrl,
    type ChatInputVisibility,
    type SendMessageBlock,
    type SendMessageRequest,
    type SendMessageResponse,
} from '../../services/api/chats';

type SendMessageProps = { chatId: string; blocks: SendMessageBlock[] };

function useSendMessage() {
    return useMutation({
        mutationFn: ({ chatId, blocks }: SendMessageProps) => {
            const visibility: ChatInputVisibility = {
                all: true,
                roles: [],
                members: [],
            };

            const message: SendMessageRequest = {
                profile_id: null,
                chat_id: chatId,
                blocks,
                visibility,
            };

            return apiPostOrFail<SendMessageResponse, SendMessageRequest>(
                sendMessageUrl,
                message,
                {},
            );
        },
        onSuccess: (_data, variables, _onMutateResult, context) => {
            context.client.invalidateQueries({
                queryKey: [CACHE_KEYS.CHAT_MESSAGE_IDS, variables.chatId],
            });
            context.client.invalidateQueries({
                queryKey: [CACHE_KEYS.CHAT_MESSAGES, variables.chatId],
            });
        },
    });
}

const ChatMessageInput = () => {
    const chatWindowState = useChatWindowState();
    const windowState = chatWindowState.value as CompleteChatInfo;

    const message = useSignal<string>('');

    const { mutate: sendMessage } = useSendMessage();

    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault();

        if (message.value === '') {
            return;
        }

        const args: SendMessageProps = {
            chatId: windowState.chat_id,
            blocks: [{ type: 'text', content_text: message.value }],
        };

        sendMessage(args, {
            onSuccess: () => {
                message.value = '';
            },
        });
    };

    const handleKeydown = (e: KeyboardEvent) => {
        if (e.key !== 'Enter' || e.isComposing) {
            return;
        }
        if (!e.ctrlKey && !e.shiftKey) {
            e.preventDefault();
            (e.currentTarget as HTMLTextAreaElement).form?.requestSubmit();
            return;
        }

        if (e.ctrlKey) {
            e.preventDefault();
            message.value = insertAtCursor(
                e.currentTarget as HTMLTextAreaElement,
                message.value,
                '\n',
            );
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            class="flex max-h-1/5 shrink-0 items-end gap-2"
        >
            <Button icon={Paperclip} />

            <textarea
                placeholder="Сообщение..."
                value={message.value}
                onKeyDown={handleKeydown}
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
