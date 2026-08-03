import Hex from '@/components/ui/Hex';
import getAvatarStyle from '@/features/profile/data/avatarStyles';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-preact';
import { useMemo, type FC } from 'preact/compat';
import type { ContactItemDTO } from '../../services/DTO/contactItemDTO';

type Props = {
    contact: ContactItemDTO;
    className?: string;
    bg?: string;
    onClick?: () => void;
    isSelected?: boolean;
};

const ContactItem: FC<Props> = ({
    contact,
    className,
    bg,
    onClick,
    isSelected = false,
}) => {
    const styles = useMemo(() => getAvatarStyle(), []);
    const colors = {
        color: styles.color,
        backgroundColor: styles.backgroundColor,
    };

    return (
        <li>
            <article
                className={cn(
                    'xs:[--hex-size:3.5rem] relative isolate p-1 pr-3 [--hex-size:3rem]',
                    className,
                )}
            >
                <SelectedMark show={isSelected} />

                <div
                    class={cn(
                        'xs:gap-5 pointer-events-none relative z-1 flex items-center gap-4 transition-transform',
                        isSelected && 'translate-x-(--hex-size)',
                    )}
                >
                    <Hex
                        styles={{ ...colors }}
                        className="relative h-(--hex-size)"
                        as="figure"
                    >
                        {contact.avatar ? (
                            <figure class="size-full">
                                <img
                                    src={contact.avatar}
                                    alt=""
                                    class="size-full object-contain object-center"
                                />
                            </figure>
                        ) : (
                            <span className="xs:text-sm text-xs font-bold">
                                {contact.initials}
                            </span>
                        )}
                    </Hex>

                    <div className="relative min-w-0 flex-1">
                        <h2 className="xs:text-lg truncate font-medium">
                            {contact.name}
                        </h2>
                        {contact.lastMessage && (
                            <p className="xs:text-base truncate text-sm text-gray-400">
                                {contact.lastMessage}
                            </p>
                        )}
                    </div>

                    <div className="relative flex flex-col items-center justify-between gap-1">
                        <span className="text-sm font-medium text-gray-400">
                            Только что
                        </span>
                        {contact.unread > 0 && (
                            <span className="bg-primary text-foreground-accent flex w-10 items-center justify-center rounded-sm text-xs font-semibold">
                                {contact.unread}
                            </span>
                        )}
                    </div>
                </div>
                <button
                    onClick={onClick}
                    class="group absolute inset-x-1 -inset-y-px isolate flex items-center justify-center rounded-md"
                >
                    <span
                        class={cn(
                            'border-foreground-muted rounded-r-primary absolute inset-y-0 right-0 left-[calc((var(--hex-size)/10*8.66/2))] -z-1 block border-l-transparent group-hover:border-2',
                            bg,
                        )}
                    />
                    <Hex
                        as="span"
                        className={cn('absolute inset-y-0 -left-1 -z-1', bg)}
                    >
                        <Hex.Border
                            className="group-hover:bg-foreground-muted"
                            variant="left-half"
                            styles={{ '--stroke': '2px' }}
                        />
                    </Hex>
                </button>
            </article>
        </li>
    );
};

export default ContactItem;

export function ContactItemSkeleton({ withTime }: { withTime: boolean }) {
    return (
        <li>
            <article className="xs:gap-5 xs:[--avatar-w:3.5rem] relative flex items-center gap-4 pr-3 [--avatar-w:3rem]">
                <figure
                    className={cn(
                        'hexagon skeleton relative flex h-[calc(var(--avatar-w)/6*7)] w-(--avatar-w) shrink-0 items-center justify-center',
                    )}
                />

                <div className="min-w-0 flex-1">
                    <h2 className="xs:text-lg skeleton truncate font-medium">
                        Lorem ipsum Lorem
                    </h2>
                    <p className="xs:text-base skeleton truncate text-sm">
                        Lorem ipsum, dolor sit amet consectetur
                    </p>
                </div>

                {withTime && (
                    <div className="flex flex-col items-center justify-between gap-1">
                        <time className="skeleton text-sm font-medium">
                            19:20
                        </time>
                        <span className="skeleton flex w-10 items-center justify-center rounded-sm text-xs font-semibold">
                            5
                        </span>
                    </div>
                )}
            </article>
        </li>
    );
}

const SelectedMark = ({ show }: { show: boolean }) => {
    if (!show) return null;

    return (
        <Hex className="text-primary absolute left-0 h-(--hex-size)">
            <Check className="size-4" />
            <Hex.Border styles={{ '--stroke': '8px' }} className="bg-black" />
            <Hex className="absolute h-[calc(var(--hex-size)-16px)]">
                <Hex.Border
                    styles={{ '--stroke': '2px' }}
                    className="bg-primary"
                />
            </Hex>
        </Hex>
    );
};
