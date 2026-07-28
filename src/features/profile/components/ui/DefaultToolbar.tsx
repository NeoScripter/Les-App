import Headline from '@/components/Headline';
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
                variant="ghost"
            />
            <Headline as="h1">Личка</Headline>
            <FramedIconBtn
                icon={Plus}
                onClick={() => (showMenu.value = true)}
            />
        </>
    );
};

export default DefaultToolbar;
