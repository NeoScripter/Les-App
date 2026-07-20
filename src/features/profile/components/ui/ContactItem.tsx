import cn from '@/utils/cn';
import type { FC } from 'preact/compat';
import type { Contact } from '../../data/contacts';

const ContactItem: FC<{ contact: Contact; className?: string }> = ({
    contact,
    className,
}) => {
    return (
        <li key={contact.id}>
            <article
                className={cn(
                    'relative flex items-center gap-3 p-3',
                    className,
                )}
            >
                <figure className="hexagon flex h-11 w-10 shrink-0 items-center justify-center bg-primary">
                    <abbr title={contact.name} className="text-sm font-medium">
                        {contact.initials}
                    </abbr>
                </figure>

                <div className="min-w-0 flex-1">
                    <h3 className="truncate font-medium">{contact.name}</h3>
                    <p className="truncate text-sm text-gray-500">
                        {contact.summary}
                    </p>
                </div>

                <div className="flex flex-col items-end gap-1">
                    <time
                        dateTime={contact.time}
                        className="text-xs text-gray-400"
                    >
                        {contact.time}
                    </time>
                    {contact.numMessages > 0 && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
                            {contact.numMessages}
                        </span>
                    )}
                </div>
                <button class="absolute inset-x-1 inset-y-0 rounded-sm border-dotted transition-[border] hover:border"></button>
            </article>
        </li>
    );
};

export default ContactItem;
