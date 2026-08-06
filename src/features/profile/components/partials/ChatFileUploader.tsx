import { useChatWindowState } from '@/app/[profile]/Profile';
import { apiPostOrFail } from '@/lib/api';
import type { Signal } from '@preact/signals';
import { File, X } from 'lucide-preact';
import useSendMessage from '../../hooks/useSendMessage';
import type { CompleteChatInfo } from '../../lib/formatters';
import {
    containerCreateUrl,
    type ContainerAddFileRequest,
    type ContainerAddFileResponse,
    type ContainerCreateRequest,
    type ContainerCreateResponse,
    type FileBlock,
} from '../../services/api/chats';
import type { SendMessageProps } from '../ui/ChatMessageInput';
import FramedIconBtn from '../ui/FramedIconBtn';

type Props = {
    show: Signal<boolean>;
};

const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

const ChatFileUploader = ({ show }: Props) => {
    const { mutate: sendMessage } = useSendMessage();
    const chatWindowState = useChatWindowState();
    const windowState = chatWindowState.value as CompleteChatInfo;

    const handleFileUpload = async (e: InputEvent) => {
        const input = e.currentTarget as HTMLInputElement;
        if (!input.files) return;

        const createContainerResult = await apiPostOrFail<
            ContainerCreateResponse,
            ContainerCreateRequest
        >(containerCreateUrl, { max_file_count: 0, allowed_content_type: '' });

        const containerId = createContainerResult.container_id;

        const newFiles = [];
        for (const file of input.files) {
            const base64String = await readFileAsDataURL(file);

            const request: ContainerAddFileRequest = {
                container_id: containerId,
                file_name: file.name,
                file_content: base64String,
                meta: '',
                description: '',
            };
            const containerResponse = await apiPostOrFail<
                ContainerAddFileResponse,
                ContainerAddFileRequest
            >(containerCreateUrl, request);

            const newFile: FileBlock = {
                type: 'file',
                file_file_id: containerResponse.file_id,
                content_text: file.name,
                file_spoiler: false
            }

            newFiles.push(newFile)
        }

        const args: SendMessageProps = {
            chatId: windowState.chat_id,
            profileId: windowState.profile_id,
            blocks: newFiles,
        };

        input.value = '';
        sendMessage(args, {
            onError: () => {
                console.log('error');
            },
        });
    };

    return (
        <article class="border-foreground-muted rounded-primary mb-6 border bg-black p-2">
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
