import { useChatWindowState } from '@/app/[profile]/Profile';
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

type SendMessageProps = {
    chatId: string;
    profileId: string;
    blocks: SendMessageBlock[];
};

// function useSendMessage() {
//     return useMutation({
//         mutationFn: ({ chatId, profileId, blocks }: SendMessageProps) => {
//             const visibility: ChatInputVisibility = {
//                 all: true,
//                 roles: [],
//                 members: [],
//             };

//             const message: SendMessageRequest = {
//                 profile_id: profileId,
//                 chat_id: chatId,
//                 blocks,
//                 visibility,
//             };

//             return apiPostOrFail<SendMessageResponse, SendMessageRequest>(
//                 sendMessageUrl,
//                 message,
//                 {},
//             );
//         },
//         onSuccess: (_data, variables, _onMutateResult, context) => {
//             context.client.invalidateQueries({
//                 queryKey: [CACHE_KEYS.CHAT_MESSAGE_IDS, variables.chatId],
//             });
//             context.client.invalidateQueries({
//                 queryKey: [CACHE_KEYS.CHAT_MESSAGES],
//             });
//         },
//     });
// }

const ChatMessageInput = () => {
    const chatWindowState = useChatWindowState();
    const windowState = chatWindowState.value as CompleteChatInfo;

    const message = useSignal<string>('');

    const { mutate: sendMessage } = useSendMessage();

    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault();

        const normalizedMessage = message.value.trim();

        if (normalizedMessage === '') {
            return;
        }

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
        <form
            onSubmit={handleSubmit}
            class="flex max-h-1/5 shrink-0 items-end gap-2"
        >
            <Button icon={Paperclip} />

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
