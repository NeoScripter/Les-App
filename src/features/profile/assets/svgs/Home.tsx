import type { FC } from 'preact/compat';

const Home: FC<{ className?: string }> = ({ className }) => {
    return (
        <svg
            class={className}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M12 5 19.25 11V19a1.25 1.25 0 0 1-1.25 1.25H5.75A1.25 1.25 0 0 1 4.5 19V11L12 5Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
        </svg>
    );
};

export default Home;
