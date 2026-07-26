import cn from '@/utils/cn';
import { useMemo, type FC } from 'preact/compat';
import type { Contact } from '../../data/contacts';
import getAvatarStyle from '../../utils/getAvatarStyle';

const ContactItem: FC<{ contact: Contact; className?: string }> = ({
    contact,
    className,
}) => {
    const styles = useMemo(() => getAvatarStyle(), []);
    const colors = {
        color: styles.color,
        backgroundColor: styles.backgroundColor,
    };

    return (
        <li key={contact.id}>
            <article
                className={cn(
                    'xs:gap-5 xs:[--avatar-w:3.5rem] relative flex items-center gap-4 pr-3 [--avatar-w:3rem]',
                    className,
                )}
            >
                <figure
                    className={cn(
                        'hexagon relative flex w-(--avatar-w) h-[calc(var(--avatar-w)/6*7)] shrink-0 items-center justify-center',
                        styles.hasBorder && 'bg-primary',
                    )}
                    style={styles.hasBorder ? {} : { ...colors }}
                >
                    <span
                        class="hexagon flex h-[92%] w-[92%] shrink-0 items-center justify-center"
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
                        <span className="bg-primary text-foreground-accent flex aspect-3/1 h-4 items-center justify-center rounded-sm text-xs font-semibold">
                            {contact.numMessages}
                        </span>
                    )}
                </div>
                <button class="group absolute inset-x-1 inset-y-0 rounded-md">
                    <span class="absolute -inset-y-px right-0 left-[calc(var(--avatar-w)/2-0.25rem)] rounded-r-md border-white/30 border-l-transparent transition-[border] group-hover:border" />
                </button>
            </article>
        </li>
    );
};

export default ContactItem;
