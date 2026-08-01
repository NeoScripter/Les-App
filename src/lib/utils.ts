import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function capitalize(sentence: string) {
    return sentence
        .split(' ')
        .map(
            (word) =>
                word.charAt(0).toUpperCase() +
                word.slice(1).toLocaleLowerCase(),
        )
        .join(' ');
}

export function checkMotionPreferences() {
    if (typeof window == 'undefined') {
        return false;
    }

    const isMotionEnabled = window.matchMedia(
        '(prefers-reduced-motion: no-preference)',
    ).matches;

    return isMotionEnabled;
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function range(start: number, end: number) {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function throttle<T extends (...args: unknown[]) => unknown>(
    fn: T,
    delay: number = 400,
): (...args: Parameters<T>) => void {
    let lastCall = 0;
    return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            fn.apply(this, args);
        }
    };
}
