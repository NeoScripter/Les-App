import PanelLayout from '@/components/layout/PanelLayout';
import Headline from '@/components/ui/Headline';
import Hex from '@/components/ui/Hex';
import Input from '@/features/profile/components/form/Input';
import PanelHeader from '@/features/profile/components/layout/PanelHeader';
import FramedIconBtn from '@/features/profile/components/ui/FramedIconBtn';
import getAvatarStyle from '@/features/profile/data/avatarStyles';
import { AudioLines, ChevronLeft, Mic, Paperclip, Video } from 'lucide-preact';
import { useMemo, type FC } from 'preact/compat';
import { useChatWindowState } from '../Profile';

const ChatWindow: FC<{ className?: string }> = ({ className }) => {
    const show = useChatWindowState();

    const styles = useMemo(() => getAvatarStyle(), []);
    const colors = {
        color: styles.color,
        backgroundColor: styles.backgroundColor,
    };

    return (
        <PanelLayout className="w-full flex-1">
            <PanelHeader>
                <button
                    type="button"
                    onClick={() => (show.value = false)}
                    class="size-10"
                >
                    <ChevronLeft />
                </button>

                <div class="flex items-center gap-3">
                    <Hex
                        styles={{ ...colors }}
                        className="relative h-10"
                        as="figure"
                    >
                        <span className="text-xs font-bold">AM</span>
                    </Hex>
                    <Headline className="text-base">Alexey Ms</Headline>
                </div>
                <button type="button" class="size-10">
                    <AudioLines />
                </button>
            </PanelHeader>
            <ul class="h-full">
                <li>To be implemented</li>
            </ul>

            <div class="flex items-center gap-2">
                <FramedIconBtn variant="ghost" size="lg" icon={Paperclip} />
                <Input placeholder="Сообщение..." className="h-12 text-lg" />

                <FramedIconBtn variant="ghost" size="lg" icon={Video} />
                <FramedIconBtn variant="ghost" size="lg" icon={Mic} />
            </div>
        </PanelLayout>
    );
};

export default ChatWindow;
