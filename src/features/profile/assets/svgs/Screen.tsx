import type { FC } from 'preact/compat';

const Screen: FC<{ className?: string }> = ({ className }) => {
    return (
        <svg
            class={className}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M3 7.5A2.5 2.5 0 0 1 5.5 5h11A2.5 2.5 0 0 1 19 7.5v6A2.5 2.5 0 0 1 16.5 16h-3.7L9 19.5V16H5.5A2.5 2.5 0 0 1 3 13.5v-6Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
        </svg>
    );
};

export default Screen;
