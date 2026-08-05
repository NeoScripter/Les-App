import type { ComponentProps } from 'preact';
import type { FC } from 'preact/compat';

const ChatTextarea: FC<ComponentProps<'textarea'>> = ({ ...props }) => {
    const handleKeydown = (e: KeyboardEvent) => {
        if (e.key !== 'Enter' || e.isComposing) {
            return;
        }
        if (!e.ctrlKey && !e.shiftKey) {
            e.preventDefault();
            (e.currentTarget as HTMLTextAreaElement).form?.requestSubmit();
            return;
        }

        // if (e.ctrlKey) {
        //     e.preventDefault();

        //     document.execCommand('insertText', false, '\n');
        // }
    };
    return (
        <textarea
            onKeyDown={handleKeydown}
            className="field-sizing-content max-h-full min-h-6 w-full resize-none overflow-y-auto px-1 text-base"
            {...props}
        />
    );
};

export default ChatTextarea;
