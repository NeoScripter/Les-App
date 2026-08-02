import { CACHE_KEYS, CACHE_LIFETIME_MS } from '@/data/constants';
import {
    getProfileFileldsUrl,
    type GetProfileFieldsRequest,
    type GetProfileFieldsResponse,
} from '@/features/profile/services/api/chats';
import { apiPostOrFail } from '@/lib/api';
import { useSuspenseQuery } from '@tanstack/preact-query';

export default function useChatProfiles(profileIds: string[]) {
    return useSuspenseQuery({
        queryKey: [CACHE_KEYS.PROFILE_FIELDS, profileIds],
        queryFn: () =>
            apiPostOrFail<GetProfileFieldsResponse, GetProfileFieldsRequest>(
                getProfileFileldsUrl,
                {
                    target_profile_ids: profileIds.slice(0, 20),
                    required_fields: [
                        'name',
                        'nickname',
                        'first_name',
                        'last_name',
                        'self_description',
                        'avatars',
                        'relationship_state.contact',
                    ],
                },
            ),
        staleTime: CACHE_LIFETIME_MS,
    });
}
