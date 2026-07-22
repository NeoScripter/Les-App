import type { FC } from 'preact/compat';

const Speaker: FC<{ className?: string }> = ({ className }) => {
    return (
        <svg
            class={className}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M7 14.75v5.25"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
            <path
                d="M5.5 10.75V13.25M5.5 10.75L9 9.5M5.5 13.25L9 14.5"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
            <path
                d="M9 9.5l6.75-2M15.75 7.5v9M9 14.5l6.75 2"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
            <path
                d="M18.25 9.75Q21.25 12 18.25 14.25"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                fill="none"
            ></path>
            <path
                d="M22 7.5Q23.75 12 22 16.5"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                fill="none"
            ></path>
        </svg>
    );
};

export default Speaker;
