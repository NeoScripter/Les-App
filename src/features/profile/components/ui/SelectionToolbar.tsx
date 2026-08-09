import Headline from '@/components/ui/Headline';
import { Button } from '@/features/profile/components/ui/Button';
import type { Signal } from '@preact/signals';
import { CheckCheck, Trash2 } from 'lucide-preact';
import type { FC } from 'preact/compat';
import useDeleteChats from "@/features/profile/hooks/useDeleteChats";

const SelectionToolbar: FC<{ selectedIds: Signal<string[] | null> }> = ({
    selectedIds,
}) => {
    const { mutate: deleteChats } = useDeleteChats();

    if (selectedIds.value === null) return;

    const handleDeleteSelectedChats = () => {
        const ids = selectedIds.value;

        if (!ids || ids.length === 0) return;
        selectedIds.value = null;

        deleteChats(ids, {
            onError: () => {
                selectedIds.value = ids;
            },
        });
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
