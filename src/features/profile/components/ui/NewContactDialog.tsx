import Headline from '@/components/Headline';
import MenuLayout from '@/layouts/MenuLayout';
import cn from '@/utils/cn';
import { ChevronLeft } from 'lucide-preact';
import type { FC } from 'preact/compat';
import { contacts } from '../../data/contacts';
import MenuHeader from '../layout/MenuHeader';
import ContactItem from './ContactItem';
import FramedIconBtn from './FramedIconBtn';
import SearchInput from './SearchInput';

const NewContactDialog: FC<{ className?: string }> = ({ className }) => {
    return (
        <MenuLayout
            className={cn(
                'bg-background-accent rounded-modal! h-[90vh] w-screen',
                className,
            )}
        >
            <MenuHeader>
                <span class="flex-1">
                    <FramedIconBtn
                        icon={ChevronLeft}
                        className="[&_svg:last-of-type]:size-6 [&_svg:last-of-type]:-translate-x-1/20"
                        variant="ghost"
                    />
                </span>
                <Headline as="h3">Новый чат</Headline>
                <span class="flex-1" />
            </MenuHeader>

            <div>
                <SearchInput placeholder="Поиск по контактам..." />
                <hr class="text-foreground-muted -mx-(--px) mt-2" />
            </div>

            <p class="text-foreground/50 font-medium">Контакты</p>

            <ul
                class={cn(
                    'scrollbar-hidden space-y-3 overflow-y-auto py-px',
                    className,
                )}
            >
                {contacts.map((contact) => (
                    <ContactItem
                        className="rounded-md bg-background"
                        key={contact.id}
                        {...contact}
                    />
                ))}
            </ul>
        </MenuLayout>
    );
};

export default NewContactDialog;
