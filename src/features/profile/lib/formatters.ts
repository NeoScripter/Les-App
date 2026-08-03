import type { PrivateChatInfo, ProfileFields } from '../services/api/chats';

export type CompleteChatInfo = PrivateChatInfo & ProfileFields;

export function combineChatAndProfileData(
    chats: PrivateChatInfo[],
    profiles: ProfileFields[],
): CompleteChatInfo[] {
    const newProfiles = [];

    for (const profile of profiles) {
        const matchingChat = chats.find(
            (chat) => chat.profile_id === profile.for_profile_id,
        );

        if (!matchingChat) {
            continue;
        }

        const newProfile = {
            ...matchingChat,
            ...profile,
        };

        newProfiles.push(newProfile);
    }

    return newProfiles;
}
