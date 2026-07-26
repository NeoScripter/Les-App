import cn from '@/utils/cn';
import { useMemo, type FC } from 'preact/compat';
import getAvatarStyle from '../../utils/getAvatarStyle';

type Props = {
    className?: string;
    name: string;
    initials: string;
    time?: string;
    summary: string;
    numMessages?: number;
};

const ContactItem: FC<Props> = ({
    name,
    initials,
    time,
    summary,
    numMessages,
    className,
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
                    'xs:gap-5 isolate xs:[--avatar-w:3.5rem] relative flex items-center gap-4 p-1 pr-3 [--avatar-w:3rem]',
                    className,
                )}
            >
                <figure
                    className={cn(
                        'hexagon relative flex h-[calc(var(--avatar-w)/6*7)] z-10 w-(--avatar-w) shrink-0 items-center justify-center',
                        styles.hasBorder && 'bg-primary',
                    )}
                    style={styles.hasBorder ? {} : { ...colors }}
                >
                    <span
                        class="hexagon flex h-[92%] w-[92%] shrink-0 items-center justify-center"
                        style={{ ...colors }}
                    >
                        <span className="xs:text-sm text-xs font-bold">
                            {initials}
                        </span>
                    </span>
                </figure>

                <div className="min-w-0 flex-1">
                    <h2 className="xs:text-lg truncate font-medium">{name}</h2>
                    <p className="xs:text-base truncate text-sm text-gray-400">
                        {summary}
                    </p>
                </div>

                {time && numMessages && (
                    <div className="flex flex-col items-center justify-between gap-1">
                        <time
                            dateTime={time}
                            className="text-sm font-medium text-gray-400"
                        >
                            {time}
                        </time>
                        {numMessages > 0 && (
                            <span className="bg-primary text-foreground-accent flex w-10 items-center justify-center rounded-sm text-xs font-semibold">
                                {numMessages}
                            </span>
                        )}
                    </div>
                )}
                <button class="group absolute inset-x-1 inset-y-0 isolate flex items-center justify-center rounded-md">
                    <span class="border-foreground-muted rounded-r-primary absolute inset-y-0 right-0 left-[calc(var(--avatar-w)/2)] block group-hover:border border-l-transparent" />
                    <span class="hex-border group-hover:bg-foreground-muted"></span>
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
                ></figure>

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
