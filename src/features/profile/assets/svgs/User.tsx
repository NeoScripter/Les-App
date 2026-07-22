import type { FC } from 'preact/compat';

const User: FC<{ className?: string }> = ({ className }) => {
    return (
        <svg
            class={className}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M20 21a8 8 0 1 0-16 0M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
            ></path>
        </svg>
    );
};

export default User;
