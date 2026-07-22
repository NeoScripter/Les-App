import Branch from '@/features/profile/assets/svgs/Branch';
import Home from '@/features/profile/assets/svgs/Home';
import Screen from '@/features/profile/assets/svgs/Screen';
import Speaker from '@/features/profile/assets/svgs/Speaker';
import User from '@/features/profile/assets/svgs/User';
import Logo from '@/features/profile/components/ui/Logo';
import cn from '@/utils/cn';
import type { ComponentChildren, ComponentType } from 'preact';
import type { FC } from 'preact/compat';

const tabs = [Screen, Branch, Speaker, Home, User];

const ChatLayout: FC<{ children: ComponentChildren; className?: string }> = ({
    children,
    className,
}) => {
    return (
        <main
            class={cn(
                'border-foreground-muted rounded-primary relative m-2 h-full max-w-md gap-4 border px-3 py-2 sm:m-4',
                className,
            )}
        >
            {children}

            <nav class="from-primary text-foreground-accent via-primary to-accent rounded-primary absolute inset-x-0 bottom-4 mx-auto flex h-10 w-9/10 basis-1/5 items-center justify-between gap-2 bg-red-400 bg-linear-to-r px-4">
                <Logo />
                <ol class="flex basis-4/5 items-center justify-between gap-2">
                    {tabs.map((tab, idx) => (
                        <Tab key={idx} svg={tab} />
                    ))}
                </ol>
            </nav>
        </main>
    );
};

export default ChatLayout;

const Tab: FC<{ svg: ComponentType }> = ({ svg }) => {
    const Svg = svg;

    return (
        <button class="xs:size-6 size-5">
            <Svg />
        </button>
    );
};
