import cn from '@/utils/cn';
import { useMemo, type FC } from 'preact/compat';
import type { Contact } from '../../data/contacts';
import getRandomColor from '../../utils/getRandomColor';

const ContactItem: FC<{ contact: Contact; className?: string }> = ({
    contact,
    className,
}) => {
    const colors = useMemo(() => getRandomColor(), []);

    return (
        <li key={contact.id}>
            <article
                className={cn(
                    'xs:gap-5 relative flex items-center gap-4 px-3 py-2',
                    className,
                )}
            >
                <figure className="hexagon bg-primary xs:h-16 xs:w-14 relative flex h-14 w-12 shrink-0 items-center justify-center">
                    <span
                        class="hexagon flex size-[92%] shrink-0 items-center justify-center"
                        style={{ ...colors }}
                    >
                        <span className="xs:text-sm text-xs font-bold">
                            {contact.initials}
                        </span>
                    </span>
                </figure>

                <div className="min-w-0 flex-1">
                    <h2 className="xs:text-lg truncate font-medium">
                        {contact.name}
                    </h2>
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
                        <span className="bg-primary text-foreground-accent flex aspect-3/1 h-4 items-center justify-center rounded-full text-xs font-semibold">
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
