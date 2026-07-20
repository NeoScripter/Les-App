import { lazy } from 'preact-iso';
const Profile = lazy(() => import('@/pages/Profile'));

const NotFound = () => '404, sorry';

export const routes = [
    { component: Profile, path: '/', protected: false },

    { component: NotFound, path: '*' },
];
