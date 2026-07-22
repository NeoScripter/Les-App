import Branch from '@/features/profile/assets/svgs/Branch';
import Home from '@/features/profile/assets/svgs/Home';
import Screen from '@/features/profile/assets/svgs/Screen';
import Speaker from '@/features/profile/assets/svgs/Speaker';
import User from '@/features/profile/assets/svgs/User';
import type { ComponentType } from 'preact';

export type PrimaryNavItemType = {
    id: string | number;
    icon: ComponentType;
    url: string;
};

export const navItems: PrimaryNavItemType[] = [
    { id: 0, icon: Screen, url: '/' },
    { id: 1, icon: Branch, url: '/branch' },
    { id: 2, icon: Speaker, url: '/speaker' },
    { id: 3, icon: Home, url: '/home' },
    { id: 4, icon: User, url: '/user' },
];
