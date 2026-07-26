import ContactList from '@/components/ContactList';
import ErrorBoundary from '@/components/ErrorBoundary';
import Headline from '@/components/Headline';
import MenuHeader from '@/features/profile/components/layout/MenuHeader';
import PrimaryNav from '@/features/profile/components/layout/PrimaryNav';
import SecondaryNav from '@/features/profile/components/layout/SecondaryNav';
import FramedIconBtn from '@/features/profile/components/ui/FramedIconBtn';
import NewContactDialog from '@/features/profile/components/ui/NewContactDialog';
import SearchInput from '@/features/profile/components/ui/SearchInput';
import { navItems } from '@/features/profile/data/secondaryNavItems';
import DialogLayout from '@/layouts/DialogLayout';
import MenuLayout from '@/layouts/MenuLayout';
import { useSignal } from '@preact/signals';
import { Ellipsis, Plus } from 'lucide-preact';
import { Suspense } from 'preact/compat';

const Profile = () => {
    const showChatMenu = useSignal(false);

    return (
        <main className="h-full">
            <MenuLayout className="h-[calc(100svh-(var(--margin)*2))] [--margin:0.5rem] sm:[--margin:1rem]">
                <MenuHeader>
                    <FramedIconBtn icon={Ellipsis} variant="ghost" />
                    <Headline as="h1">Личка</Headline>
                    <FramedIconBtn
                        icon={Plus}
                        onClick={() => (showChatMenu.value = true)}
                    />
                </MenuHeader>

                <div>
                    <SearchInput placeholder="Поиск по чатам..." />

                    <SecondaryNav items={navItems} />
                </div>
                <ErrorBoundary>
                    <Suspense fallback={<div>Загрузка...</div>}>
                        <ContactList />
                    </Suspense>
                </ErrorBoundary>

                <DialogLayout
                    show={showChatMenu.value}
                    onClose={() => (showChatMenu.value = false)}
                >
                    <NewContactDialog />
                </DialogLayout>

                <PrimaryNav />
            </MenuLayout>
        </main>
    );
};

export default Profile;
