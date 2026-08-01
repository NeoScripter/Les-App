import {
    apiPostResult,
    type ApiPostOptions,
} from '../../../../services/api/apiPostResult';
import type {
    ProfileSearchV0Request,
    ProfileSearchV0Response,
    ProfileSearchV0Result,
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
    PrivateChatSecondGetChatsOneVOneV0Result,
} from '../../../../services/public-api-union/chat_private_chat_second';

export type GetUserChatIdsResult = PrivateChatSecondGetChatsOneVOneV0Result;
export type GetUserChatIdsRequest = PrivateChatSecondGetChatsOneVOneV0Request;
export type GetUserChatIdsResponse = PrivateChatSecondGetChatsOneVOneV0Response;

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

// if the person is a contact, show first name, last name and short descritpion
// otherwise name
// if is blocked, display the blocked notification but don't delete the chat

/// Don't forget to cache each separate response for unique contact id manually

export type FindUserByNicknameRequest = ProfileSearchV0Request;
export type FindUserByNicknameResult = ProfileSearchV0Result;
export type FindUserByNicknameResponse = ProfileSearchV0Response;

export async function findUsersByNickname(
    body: FindUserByNicknameRequest,
    options: ApiPostOptions = {},
): Promise<FindUserByNicknameResult> {
    return apiPostResult<FindUserByNicknameResponse>(
        '/api/profile/search/v0',
        body,
        options,
    );
}

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
