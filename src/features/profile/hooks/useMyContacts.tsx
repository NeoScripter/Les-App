import { CACHE_KEYS, CACHE_LIFETIME_MS } from '@/data/constants';
import {
    searchNewChatProfilesUrl,
    type SearchNewChatProfilesRequest,
    type SearchNewChatProfilesResponse,
} from '@/features/profile/services/api/chats';
import { apiPostOrFail } from '@/lib/api';
import { useSuspenseQuery } from '@tanstack/preact-query';

export default function useMyContacts({ query }: { query: string }) {
    return useSuspenseQuery({
        queryKey: [CACHE_KEYS.USER_CONTACTS, query],
        queryFn: () =>
            apiPostOrFail<
                SearchNewChatProfilesResponse,
                SearchNewChatProfilesRequest
            >(searchNewChatProfilesUrl, { search: query, search_limit: 1000 }),
        staleTime: CACHE_LIFETIME_MS,
    });
}
