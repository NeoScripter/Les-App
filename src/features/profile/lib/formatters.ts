import type { PrivateChatInfo, ProfileFields } from '../services/api/chats';

export type CompleteChatInfo = PrivateChatInfo & ProfileFields;

export function combineChatAndProfileData(
    chats: PrivateChatInfo[],
    profiles: ProfileFields[],
): CompleteChatInfo[] {
    const newProfiles = [];

    for (const profile of profiles) {
        const matchingChat = chats.find(
            (chat) => chat.interlocutor_id === profile.target_profile_id,
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

export function convertDateToISOWithoutMillis(date: Date) {
    return date.toISOString().replace(/\.\d{3}Z$/, 'Z');
}

export function covertDateFromISOToHourAndMinute(date: string) {
    const temporalDate = Temporal.PlainDateTime.from(date.slice(0, -1));
    return `${temporalDate.hour}:${temporalDate.minute.toString().padStart(2, '0')}`;
}
