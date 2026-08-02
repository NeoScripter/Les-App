import type { PrivateChatInfo, ProfileFields } from '../services/api/chats';

type CombinedProfileInfo = PrivateChatInfo & ProfileFields;

export function combineChatAndProfileData(
    chats: PrivateChatInfo[],
    profiles: ProfileFields[],
): CombinedProfileInfo[] {

    const map = new Map(chats.map((item) => [item.profile_id, item]));

    const completeProfiles = profiles.map((item) => ({
        ...item,
        ...map.get(item.for_profile_id),
    })) as unknown as CombinedProfileInfo[];

    return completeProfiles;
}
