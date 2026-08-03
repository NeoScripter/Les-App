import { CACHE_KEYS, CACHE_LIFETIME_MS } from '@/data/constants';
import {
    getProfileFieldsUrl,
    type GetProfileFieldsRequest,
    type GetProfileFieldsResponse,
} from '@/features/profile/services/api/chats';
import { apiPostOrFail } from '@/lib/api';
import { useSuspenseQueries } from '@tanstack/preact-query';

export default function useChatProfiles(profileIds: string[]) {
    return useSuspenseQueries({
        queries: profileIds.map((profileId) => ({
            queryKey: [CACHE_KEYS.PROFILE_FIELDS, profileId],
            queryFn: () =>
                apiPostOrFail<
                    GetProfileFieldsResponse,
                    GetProfileFieldsRequest
                >(getProfileFieldsUrl, {
                    target_profile_ids: [profileId],
                    required_fields: [
                        'name',
                        'nickname',
                        'first_name',
                        'last_name',
                        'self_description',
                        'avatars',
                        'relationship_state.contact',
                    ],
                }),
            staleTime: CACHE_LIFETIME_MS,
        })),
        combine: (results) => ({
            profile_looks: results.flatMap((r) => r.data.profile_looks),
        }),
    });
}
