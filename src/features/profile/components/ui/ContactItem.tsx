import type { FC } from 'preact/compat';
import type { Contact } from '../../data/contacts';

const ContactItem: FC<{ contact: Contact; className?: string }> = ({
    contact,
    className,
}) => {
    return (
        <li key={contact.id}>
            <article className="flex items-center gap-3 p-3 hover:bg-gray-50">
                <figure className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-200">
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
            </article>
        </li>
    );
};

export default ContactItem;
