import {
    apiPostResult,
    type ApiPostOptions,
} from '../../../../services/api/apiPostResult';
import type {
    ProfileSearchWithContactsV0Request,
    ProfileSearchWithContactsV0Response,
    ProfileSearchWithContactsV0Result,
    ProfileViewOthersRequiredFieldsV0Request,
    ProfileViewOthersRequiredFieldsV0Response,
    ProfileViewOthersRequiredFieldsV0ResponseNamingData,
    ProfileViewOthersRequiredFieldsV0ResponseProfileLook,
    ProfileViewOthersRequiredFieldsV0Result,
} from '../../../../services/public-api-union/authorization_profile';
import type {
    ProfileRelationshipContactAddV0Request,
    ProfileRelationshipContactAddV0Response,
    ProfileRelationshipContactAddV0Result,
} from '../../../../services/public-api-union/authorization_profiles_relationship';
import type {
    PrivateChatSecondDeleteChatsOneVOneV0Request,
    PrivateChatSecondDeleteChatsOneVOneV0Response,
    PrivateChatSecondDeleteChatsOneVOneV0Result,
    PrivateChatSecondGetChatsOneVOneV0Request,
    PrivateChatSecondGetChatsOneVOneV0Response,
    PrivateChatSecondGetChatsOneVOneV0ResponseChatInfo,
    PrivateChatSecondGetChatsOneVOneV0Result,
    PrivateChatSecondMessageGetByIdsV0Request,
    PrivateChatSecondMessageGetByIdsV0Response,
    PrivateChatSecondMessageGetByIdsV0Result,
    PrivateChatSecondMessageGetIdsV0Request,
    PrivateChatSecondMessageGetIdsV0Response,
    PrivateChatSecondMessageGetIdsV0Result,
} from '../../../../services/public-api-union/chat_private_chat_second';

export type GetUserChatIdsResult = PrivateChatSecondGetChatsOneVOneV0Result;
export type GetUserChatIdsRequest = PrivateChatSecondGetChatsOneVOneV0Request;
export type GetUserChatIdsResponse = PrivateChatSecondGetChatsOneVOneV0Response;
export type PrivateChatInfo =
    PrivateChatSecondGetChatsOneVOneV0ResponseChatInfo;

export async function getUserChatIds(
    body: GetUserChatIdsRequest,
    options: ApiPostOptions = {},
): Promise<GetUserChatIdsResult> {
    return apiPostResult<GetUserChatIdsResponse>(
        '/api/privateChatSecond/getChats/oneVOne/v0',
        body,
        options,
    );
}

export const getUserChatIdsUrl = '/api/privateChatSecond/getChats/oneVOne/v0';

export type GetProfileFieldsRequest = ProfileViewOthersRequiredFieldsV0Request;
export type GetProfileFieldsResult = ProfileViewOthersRequiredFieldsV0Result;
export type GetProfileFieldsResponse =
    ProfileViewOthersRequiredFieldsV0Response;
export type ProfileFields =
    ProfileViewOthersRequiredFieldsV0ResponseProfileLook;
export type ContactInfo = ProfileViewOthersRequiredFieldsV0ResponseNamingData;

export async function getProfileFields(
    body: GetProfileFieldsRequest,
    options: ApiPostOptions = {},
): Promise<GetProfileFieldsResult> {
    return apiPostResult<GetProfileFieldsResponse>(
        '/api/profile/view/others/requiredFields/v0',
        body,
        options,
    );
}

export const getProfileFileldsUrl =
    '/api/profile/view/others/requiredFields/v0';

export type GetChatMessageIdsRequest = PrivateChatSecondMessageGetIdsV0Request;
export type GetChatMessageIdsResult = PrivateChatSecondMessageGetIdsV0Result;
export type GetChatMessageIdsResponse =
    PrivateChatSecondMessageGetIdsV0Response;

export async function getChatMessageIds(
    body: GetChatMessageIdsRequest,
    options: ApiPostOptions = {},
): Promise<GetChatMessageIdsResult> {
    return apiPostResult<GetChatMessageIdsResponse>(
        '/api/privateChatSecond/message/getIds/v0',
        body,
        options,
    );
}

export const getChatMessageIdsUrl = '/api/privateChatSecond/message/getIds/v0';

export type GetChatMessagesRequest = PrivateChatSecondMessageGetByIdsV0Request;
export type GetChatMessagesResult = PrivateChatSecondMessageGetByIdsV0Result;
export type GetChatMessagesResponse =
    PrivateChatSecondMessageGetByIdsV0Response;

export async function getChatMessages(
    body: GetChatMessagesRequest,
    options: ApiPostOptions = {},
): Promise<GetChatMessagesResult> {
    return apiPostResult<GetChatMessagesResponse>(
        '/api/privateChatSecond/message/getByIds/v0',
        body,
        options,
    );
}

export const getChatMessagesUrl = '/api/privateChatSecond/message/getByIds/v0';


export type AddUserToContactsRequest = ProfileRelationshipContactAddV0Request;
export type AddUserToContactsResult = ProfileRelationshipContactAddV0Result;
export type AddUserToContactsResponse = ProfileRelationshipContactAddV0Response;

export async function addUsersToContacts(
    body: AddUserToContactsRequest,
    options: ApiPostOptions = {},
): Promise<AddUserToContactsResult> {
    return apiPostResult<AddUserToContactsResponse>(
        '/api/profilesRelationship/contact/add/v0',
        body,
        options,
    );
}

export type SearchNewChatProfilesRequest = ProfileSearchWithContactsV0Request;
export type SearchNewChatProfilesResult = ProfileSearchWithContactsV0Result;
export type SearchNewChatProfilesResponse = ProfileSearchWithContactsV0Response;

export async function searchNewChatProfiles(
    body: SearchNewChatProfilesRequest,
    options: ApiPostOptions = {},
): Promise<SearchNewChatProfilesResult> {
    return apiPostResult<SearchNewChatProfilesResponse>(
        '/api/profile/search/withContacts/v0',
        body,
        options,
    );
}

export const searchNewChatProfilesUrl = '/api/profile/search/withContacts/v0';

export type DeleteUserChatsRequest =
    PrivateChatSecondDeleteChatsOneVOneV0Request;
export type DeleteUserChatsResult = PrivateChatSecondDeleteChatsOneVOneV0Result;
export type DeleteUserChatsResponse =
    PrivateChatSecondDeleteChatsOneVOneV0Response;

export async function deleteUserChats(
    body: DeleteUserChatsRequest,
    options: ApiPostOptions = {},
): Promise<DeleteUserChatsResult> {
    return apiPostResult<DeleteUserChatsResponse>(
        '/api/privateChatSecond/deleteChats/oneVOne/v0',
        body,
        options,
    );
}

export const deleteUserChatsUrl =
    '/api/privateChatSecond/deleteChats/oneVOne/v0';
