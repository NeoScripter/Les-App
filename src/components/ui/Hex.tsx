import { cn  }from '@/lib/utils';
import type { ComponentChildren, CSSProperties } from 'preact';

type Props = {
    className?: string;
    as?: keyof HTMLElementTagNameMap;
    children?: ComponentChildren;
    styles?: CSSProperties;
};

export default function Hex({
    className,
    children,
    as: Tag = 'div',
    styles,
}: Props) {
    return (
        <Tag
            class={cn(
                'hexagon relative flex items-center justify-center',
                className,
            )}
            style={styles}
        >
            {children}
        </Tag>
    );
}

type BorderProps = {
    className?: string;
    styles?: CSSProperties;
    variant?: 'left-half' | 'right-half';
};

export function HexBorder({ className, styles, variant }: BorderProps) {
    return (
        <span
            class={cn('hex-border absolute inset-0 h-full', className, {
                'hex-border--left': variant === 'left-half',
                'hex-border--right': variant === 'right-half',
            })}
            style={styles}
        />
    );
}

Hex.Border = HexBorder;
