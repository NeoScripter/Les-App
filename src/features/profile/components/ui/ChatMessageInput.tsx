import { Mic, Paperclip, type LucideIcon } from 'lucide-preact';
import type { ComponentProps, FC } from 'preact/compat';

const ChatMessageInput: FC<{
    className?: string;
}> = ({ className }) => {
    return (
        <div class="flex max-h-1/5 shrink-0 items-end gap-2">
            <Button icon={Paperclip} />

            <textarea
                placeholder="Сообщение..."
                className="field-sizing-content max-h-full min-h-6 w-full resize-none overflow-y-auto px-1 text-sm"
            />

            <div class="flex flex-col items-end justify-between gap-2">
                {/* <button class="size-6" type="button"> */}
                {/*     <Video class="size-full" /> */}
                {/* </button> */}
                <Button icon={Mic} />
            </div>
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
