import Headline from '@/components/ui/Headline';
import FramedIconBtn from '@/features/profile/components/ui/FramedIconBtn';
import type { Signal } from '@preact/signals';
import { Ellipsis, Plus } from 'lucide-preact';
import type { FC } from 'preact/compat';

const DefaultToolbar: FC<{
    showMenu: Signal<boolean>;
}> = ({ showMenu }) => {
    return (
        <>
            <FramedIconBtn
                popovertarget="profile-popover"
                style="anchor-name: --profile;"
                icon={Ellipsis}
                size="sm"
                variant="ghost"
            />
            <Headline as="h1">Личка</Headline>
            <FramedIconBtn
                icon={Plus}
                size="sm"
                onClick={() => (showMenu.value = true)}
            />
        </>
    );
};

export default DefaultToolbar;
