import Headline from '@/components/ui/Headline';
import DialogLayout from '@/components/layout/DialogLayout';
import MenuLayout from '@/components/layout/PanelLayout';
import { cn  }from '@/lib/utils';
import type { Signal } from '@preact/signals';
import { useSignal } from '@preact/signals';
import { ChevronLeft } from 'lucide-preact';
import type { FC } from 'preact/compat';
import CreateContact from '../ui/CreateContact';
import FramedIconBtn from '../ui/FramedIconBtn';
import InviteToLes from '../ui/InviteToLes';
import MiniChat from '../ui/MiniChat';
import NewChat from '../ui/NewChat';
import SecretChat from '../ui/SecretChat';
import PanelHeader from './PanelHeader';

type Props = {
    className?: string;
    show: Signal<boolean>;
};

export type ChatTabProps = {
    show: Signal<boolean>;
    currentTab: Signal<TabType>;
};

export type TabType =
    | 'new_chat'
    | 'secret_chat'
    | 'invite'
    | 'create_contact'
    | 'mini_chat';

const tabMap: Record<TabType, FC<ChatTabProps>> = {
    new_chat: NewChat,
    invite: InviteToLes,
    create_contact: CreateContact,
    secret_chat: SecretChat,
    mini_chat: MiniChat,
};

const NewChatDialog: FC<Props> = ({ className, show }) => {
    const currentTab = useSignal<TabType>('new_chat');

    const Tab = tabMap[currentTab.value];

    return (
        <DialogLayout show={show.value} onClose={() => (show.value = false)}>
            <MenuLayout
                className={cn(
                    'bg-background-accent rounded-modal! h-[calc(100svh-(var(--py)*2))] w-[calc(100vw-(var(--px)*2))] md:h-[90vh]',
                    className,
                )}
            >
                <Tab currentTab={currentTab} show={show} />
            </MenuLayout>
        </DialogLayout>
    );
};

export default NewChatDialog;

export function NewChatHeader({
    onClick,
    headline,
}: {
    onClick: () => void;
    headline: string;
}) {
    return (
        <PanelHeader>
            <span class="flex-1">
                <FramedIconBtn
                    onClick={onClick}
                    icon={ChevronLeft}
                    className="[&_svg:last-of-type]:size-6 [&_svg:last-of-type]:-translate-x-1/20"
                    variant="ghost"
                />
            </span>
            <Headline as="h3">{headline}</Headline>
            <span class="flex-1" />
        </PanelHeader>
    );
}
