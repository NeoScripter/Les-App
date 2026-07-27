import cn from '@/utils/cn';
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
                'hex relative flex items-center justify-center',
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
};

export function HexBorder({ className, styles }: BorderProps) {
    return (
        <span
            class={cn('hex-border absolute inset-0 h-full', className)}
            style={styles}
        />
    );
}

Hex.Border = HexBorder;
