import Headline from '@/components/Headline';
import DialogLayout from '@/layouts/DialogLayout';
import MenuLayout from '@/layouts/MenuLayout';
import cn from '@/utils/cn';
import type { Signal } from '@preact/signals';
import { ChevronLeft } from 'lucide-preact';
import type { FC } from 'preact/compat';
import { contacts } from '../../data/contacts';
import ChatShell from '../layout/ChatShell';
import MenuHeader from '../layout/MenuHeader';
import ContactItem from './ContactItem';
import FramedIconBtn from './FramedIconBtn';
import SearchInput from './SearchInput';

type Props = {
    className?: string;
    show: Signal<boolean>;
};

const NewChatDialog: FC<Props> = ({ className, show }) => {
    return (
        <DialogLayout show={show.value} onClose={() => (show.value = false)}>
            <MenuLayout
                className={cn(
                    'bg-background-accent rounded-modal! h-[calc(100svh-(var(--py)*2))] w-[calc(100vw-(var(--px)*2))] md:h-[90vh]',
                    className,
                )}
            >
                <MenuHeader>
                    <span class="flex-1">
                        <FramedIconBtn
                            onClick={() => (show.value = false)}
                            icon={ChevronLeft}
                            className="[&_svg:last-of-type]:size-6 [&_svg:last-of-type]:-translate-x-1/20"
                            variant="ghost"
                        />
                    </span>
                    <Headline as="h3">Новый чат</Headline>
                    <span class="flex-1" />
                </MenuHeader>

                <div>
                    <SearchInput placeholder="Поиск по всем..." />
                    <hr class="text-foreground-muted -mx-(--px) mt-2" />
                </div>

                <p class="text-foreground/50 font-medium">Контакты</p>

                <ChatShell>
                    {contacts.map((contact) => (
                        <ContactItem
                            key={contact.id}
                            bg="bg-background"
                            {...contact}
                        />
                    ))}
                </ChatShell>
            </MenuLayout>
        </DialogLayout>
    );
};

export default NewChatDialog;
