import type { Signal } from '@preact/signals';
import { Button } from './Button';

type PopoverProps = {
    chatIds: Signal<string[] | null>;
};

export default function Popover({ chatIds }: PopoverProps) {
    const handleReadAllChats = () => {
        alert('Not implemented yet');
        chatIds.value = null;
    };

    return (
        <div
            id="profile-popover"
            popover
            class="bg-background-accent rounded-primary border-foreground-muted w-full max-w-40 border text-inherit shadow-md"
        >
            <ul class="divide-foreground-muted/50 divide-y">
                <ActionButton
                    onClick={() => (chatIds.value = [])}
                    label="Выбрать"
                />
                <ActionButton
                    onClick={handleReadAllChats}
                    label="Прочитать все"
                />
            </ul>
        </div>
    );
}

const ActionButton = ({
    onClick,
    label,
}: {
    label: string;
    onClick: () => void;
}) => {
    return (
        <li>
            <Button
                onClick={onClick}
                className="w-full"
                size="sm"
                variant="ghost"
            >
                {label}
            </Button>
        </li>
    );
};
