import cn from '@/utils/cn';
import type { FC } from 'preact/compat';
import type { Contact } from '../../data/contacts';
import getRandomColor from '../../utils/getRandomColor';

const ContactItem: FC<{ contact: Contact; className?: string }> = ({
    contact,
    className,
}) => {
    const colors = getRandomColor();

    return (
        <li key={contact.id}>
            <article
                className={cn(
                    'xs:gap-4 relative flex items-center gap-3 p-3',
                    className,
                )}
            >
                <figure className="hexagon bg-primary xs:h-13 xs:w-12 flex h-11 w-10 shrink-0 items-center justify-center">
                    <span
                        class="hexagon flex size-[96%] shrink-0 items-center justify-center"
                        style={{ ...colors }}
                    >
                        <span className="xs:text-sm text-xs font-bold">
                            {contact.initials}
                        </span>
                    </span>
                </figure>

                <div className="min-w-0 flex-1">
                    <h3 className="xs:text-lg truncate font-medium">
                        {contact.name}
                    </h3>
                    <p className="xs:text-base truncate text-sm text-gray-400">
                        {contact.summary}
                    </p>
                </div>

                <div className="flex flex-col items-center justify-between gap-1">
                    <time
                        dateTime={contact.time}
                        className="text-sm font-medium text-gray-400"
                    >
                        {contact.time}
                    </time>
                    {contact.numMessages > 0 && (
                        <span className="bg-primary text-foreground-accent flex h-5 w-10 items-center justify-center rounded-full text-xs font-semibold">
                            {contact.numMessages}
                        </span>
                    )}
                </div>
                <button class="rounded-primary absolute inset-x-1 inset-y-0 border-dotted transition-[border] hover:border"></button>
            </article>
        </li>
    );
};

export default ContactItem;
