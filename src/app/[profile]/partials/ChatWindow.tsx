import PanelLayout from '@/components/layout/PanelLayout';
import Headline from '@/components/ui/Headline';
import Hex from '@/components/ui/Hex';
import { CACHE_KEYS, CACHE_LIFETIME_MS } from '@/data/constants';
import Input from '@/features/profile/components/form/Input';
import PanelHeader from '@/features/profile/components/layout/PanelHeader';
import FramedIconBtn from '@/features/profile/components/ui/FramedIconBtn';
import getAvatarStyle from '@/features/profile/data/avatarStyles';
import type { CompleteChatInfo } from '@/features/profile/lib/formatters';
import {
    getChatMessageIdsUrl,
    getChatMessagesUrl,
    type GetChatMessageIdsRequest,
    type GetChatMessageIdsResponse,
    type GetChatMessagesRequest,
    type GetChatMessagesResponse,
} from '@/features/profile/services/api/chats';
import convertToContactItemDTO from '@/features/profile/services/DTO/contactItemDTO';
import { apiPostOrFail } from '@/lib/api';
import type { Signal } from '@preact/signals';
import { useSuspenseQuery } from '@tanstack/preact-query';
import { AudioLines, ChevronLeft, Mic, Paperclip, Video } from 'lucide-preact';
import { useMemo, type FC } from 'preact/compat';

function useChatMessageIds(chatWindowState: CompleteChatInfo) {
    const req: GetChatMessageIdsRequest = {
        profile_id: null,
        chat_id: chatWindowState.chat_id,
        current_read_message_id: chatWindowState.last_read_message_id,
    };
    return useSuspenseQuery({
        queryKey: [CACHE_KEYS.CHAT_MESSAGE_IDS],
        queryFn: () =>
            apiPostOrFail<GetChatMessageIdsResponse, GetChatMessageIdsRequest>(
                getChatMessageIdsUrl,
                req,
            ),
        staleTime: CACHE_LIFETIME_MS,
    });
}

type ChatMessagesProps = { chatId: string; messageIds: string[] };

function useChatMessages({ chatId, messageIds }: ChatMessagesProps) {
    return useSuspenseQuery({
        queryKey: [CACHE_KEYS.CHAT_MESSAGES],
        queryFn: () =>
            apiPostOrFail<GetChatMessagesResponse, GetChatMessagesRequest>(
                getChatMessagesUrl,
                { chat_id: chatId, message_ids: messageIds, profile_id: null },
            ),
        staleTime: CACHE_LIFETIME_MS,
    });
}

type Props = {
    chatWindowState: Signal<CompleteChatInfo | null>;
};

const ChatWindow: FC<Props> = ({ chatWindowState }) => {
    const windowState = chatWindowState.value as CompleteChatInfo;
    const { data: chatMessageIdData } = useChatMessageIds(windowState);
    const chatId = windowState.chat_id;

    // console.log(chatMessageIdData)
    const messageIds = chatMessageIdData.messages_in_between.map(
        (message) => message.message_id,
    );

    const { data: chatMessages } = useChatMessages({ chatId, messageIds });

    console.log(chatMessages);

    const styles = useMemo(() => getAvatarStyle(), []);
    const colors = {
        color: styles.color,
        backgroundColor: styles.backgroundColor,
    };

    const personData = convertToContactItemDTO(windowState)

    return (
        <PanelLayout className="w-full flex-1">
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
                        <span className="text-xs font-bold">{personData.initials}</span>
                    </Hex>
                    <Headline className="text-base">{personData.name}</Headline>
                </div>
                <button type="button" class="size-10">
                    <AudioLines />
                </button>
            </PanelHeader>
            <ul class="h-full">
                {chatMessages.messages.map((message) => (
                    <li key={message.id}>
                        {message.blocks.map((block, idx) => (
                            <p key={idx}>{block.content_text}</p>
                        ))}
                    </li>
                ))}
            </ul>

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
