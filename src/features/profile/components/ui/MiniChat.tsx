import Headline from '@/components/Headline';
import { ChevronLeft } from 'lucide-preact';
import type { FC } from 'preact/compat';
import MenuHeader from '../layout/MenuHeader';
import type { ChatTabProps } from '../layout/NewChatDialog';
import FramedIconBtn from './FramedIconBtn';

const MiniChat: FC<ChatTabProps> = ({ currentTab }) => {
    return (
        <>
            <MenuHeader>
                <span class="flex-1">
                    <FramedIconBtn
                        onClick={() => (currentTab.value = 'new_chat')}
                        icon={ChevronLeft}
                        className="[&_svg:last-of-type]:size-6 [&_svg:last-of-type]:-translate-x-1/20"
                        variant="ghost"
                    />
                </span>
                <Headline as="h3">Мини чат</Headline>
                <span class="flex-1" />
            </MenuHeader>
            TODO
        </>
    );
};

export default MiniChat;

