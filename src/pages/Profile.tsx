import Headline from '@/components/Headline';
import SecondaryNav from '@/features/profile/components/layout/SecondaryNav';
import ContactItem from '@/features/profile/components/ui/ContactItem';
import FramedIconBtn from '@/features/profile/components/ui/FramedIconBtn';
import { contacts } from '@/features/profile/data/contacts';
import { navItems } from '@/features/profile/data/secondaryNavItems';
import ChatLayout from '@/layouts/ChatLayout';
import { apiPostOrThrow } from '@/lib/apiPostOrThrow';
import {
    getMyProfilesV0,
    type GetMyProfilesV0Response,
} from '@/services/api/profile';
import { useQuery } from '@tanstack/preact-query';
import { Ellipsis, Plus } from 'lucide-preact';

function useMyProfiles() {
    return useQuery({
        queryKey: ['my-profiles'],
        queryFn: () => 
            apiPostOrThrow<GetMyProfilesV0Response>(
                '/api/profile/getMy/v0',
                {}
            ),
    });
}
// function useMyProfiles() {
//     return useQuery({
//         queryKey: ['my-profiles'],
//         queryFn: async (): Promise<GetMyProfilesV0Response> => {
//             const result = await getMyProfilesV0();

//             if (!result.ok || result.backErr || result.has_tech_problem) {
//                 throw new Error(
//                     result.backErr?.message ?? 'Failed to fetch profiles',
//                 );
//             }

//             return result.value!;
//         },
//     });
// }

const Profile = () => {
    const { data, isLoading, error } = useMyProfiles();

    if (isLoading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error.message}</div>;

    console.log(data);

    return (
        <ChatLayout className="flex h-[calc(100svh-(var(--margin)*2))] flex-col [--margin:0.5rem] sm:[--margin:1rem]">
            <header class="mt-1 flex items-center justify-between gap-2 sm:mt-2">
                <FramedIconBtn icon={Ellipsis} variant="ghost" />
                <Headline>Личка</Headline>
                <FramedIconBtn icon={Plus} />
            </header>

            <div>
                <input
                    type="search"
                    class="border-foreground-muted rounded-primary mb-2 w-full border px-3 py-1"
                    placeholder="Поиск по чатам..."
                />

                <SecondaryNav items={navItems} />
            </div>
            <ul class="scrollbar-hidden overflow-y-auto">
                {contacts
                    .toSorted((a, b) => b.time.localeCompare(a.time))
                    .map((contact) => (
                        <ContactItem key={contact.id} contact={contact} />
                    ))}
            </ul>
        </ChatLayout>
    );
};

export default Profile;
