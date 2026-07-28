import Headline from '@/components/Headline';
import { Button } from '@/features/profile/components/ui/Button';
import type { Signal } from '@preact/signals';
import { CheckCheck, Trash2 } from 'lucide-preact';
import type { FC } from 'preact/compat';

const SelectionToolbar: FC<{ selectedIds: Signal<string[] | null> }> = ({
    selectedIds,
}) => {
    if (selectedIds.value === null) return;

    const handleDeleteSelectedChats = () => {
        alert('Not implemented yet');
        selectedIds.value = null;
    };

    return (
        <>
            <Button
                disabled={selectedIds.value.length === 0}
                className="bg-accent"
                onClick={handleDeleteSelectedChats}
                variant="icon"
            >
                <Trash2 />
            </Button>
            <Headline as="h1">Выбрано: {selectedIds.value.length}</Headline>
            <Button
                onClick={() => (selectedIds.value = null)}
                className="bg-primary"
                variant="icon"
            >
                <CheckCheck />
            </Button>
        </>
    );
};

export default SelectionToolbar;
