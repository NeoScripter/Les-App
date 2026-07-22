import type { FC } from 'preact/compat';

const Branch: FC<{ className?: string }> = ({ className }) => {
    return (
        <svg
            class={className}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M6 19.25 17 4.75"
                stroke="currentColor"
                stroke-width="2.15"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
            <path
                d="M8.2 16.35 Q5.4 14.7 4.1 11.6"
                stroke="currentColor"
                stroke-width="2.15"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
            <path
                d="M11.3 12.3 Q15.6 12.45 18.1 10.35"
                stroke="currentColor"
                stroke-width="2.15"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
            <path
                d="M13.45 9.4 Q11.5 7.55 10.05 5.85"
                stroke="currentColor"
                stroke-width="2.15"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
            <path
                d="M15 7.35 Q16.85 5.35 17.55 4.35"
                stroke="currentColor"
                stroke-width="2.15"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
        </svg>
    );
};

export default Branch;
