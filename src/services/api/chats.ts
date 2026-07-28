import type {
    PrivateChatGetListV0Response,
    PrivateChatGetListV0Result,
} from '../public-api-union/chat_private_chat';
import { apiPostResult, type ApiPostOptions } from './apiPostResult';

export type UserChatsResult = PrivateChatGetListV0Result;
export type UserChatsResponse = PrivateChatGetListV0Response;

export async function getUserChats(
    options: ApiPostOptions = {},
): Promise<UserChatsResult> {
    return apiPostResult<UserChatsResponse>(
        '/api/privateChat/getList/v0',
        {},
        options,
    );
}

export const userChatsUrl = '/api/privateChat/getList/v0';
