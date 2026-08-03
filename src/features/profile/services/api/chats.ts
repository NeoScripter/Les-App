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
    PrivateChatSecondMessageGetByIdsV0ResponseMessageInfo,
} from '../../../../services/public-api-union/chat_private_chat_second';

// ============================================
// Re-exports with aliases (Method 4)
// ============================================

// GetUserChatIds
export type {
    PrivateChatSecondGetChatsOneVOneV0Result as GetUserChatIdsResult,
    PrivateChatSecondGetChatsOneVOneV0Request as GetUserChatIdsRequest,
    PrivateChatSecondGetChatsOneVOneV0Response as GetUserChatIdsResponse,
    PrivateChatSecondGetChatsOneVOneV0ResponseChatInfo as PrivateChatInfo,
};

export const getUserChatIdsUrl = '/api/privateChatSecond/getChats/oneVOne/v0';

// GetProfileFields
export type {
    ProfileViewOthersRequiredFieldsV0Request as GetProfileFieldsRequest,
    ProfileViewOthersRequiredFieldsV0Result as GetProfileFieldsResult,
    ProfileViewOthersRequiredFieldsV0Response as GetProfileFieldsResponse,
    ProfileViewOthersRequiredFieldsV0ResponseProfileLook as ProfileFields,
    ProfileViewOthersRequiredFieldsV0ResponseNamingData as ContactInfo,
};

export const getProfileFieldsUrl =
    '/api/profile/view/others/requiredFields/v0';

// GetChatMessageIds
export type {
    PrivateChatSecondMessageGetIdsV0Request as GetChatMessageIdsRequest,
    PrivateChatSecondMessageGetIdsV0Result as GetChatMessageIdsResult,
    PrivateChatSecondMessageGetIdsV0Response as GetChatMessageIdsResponse,
};

export const getChatMessageIdsUrl = '/api/privateChatSecond/message/getIds/v0';

// GetChatMessages
export type {
    PrivateChatSecondMessageGetByIdsV0Request as GetChatMessagesRequest,
    PrivateChatSecondMessageGetByIdsV0Result as GetChatMessagesResult,
    PrivateChatSecondMessageGetByIdsV0Response as GetChatMessagesResponse,
    PrivateChatSecondMessageGetByIdsV0ResponseMessageInfo as ChatMessageType,
};

export const getChatMessagesUrl = '/api/privateChatSecond/message/getByIds/v0';

// AddUserToContacts
export type {
    ProfileRelationshipContactAddV0Request as AddUserToContactsRequest,
    ProfileRelationshipContactAddV0Result as AddUserToContactsResult,
    ProfileRelationshipContactAddV0Response as AddUserToContactsResponse,
};

// SearchNewChatProfiles
export type {
    ProfileSearchWithContactsV0Request as SearchNewChatProfilesRequest,
    ProfileSearchWithContactsV0Result as SearchNewChatProfilesResult,
    ProfileSearchWithContactsV0Response as SearchNewChatProfilesResponse,
};

export const searchNewChatProfilesUrl = '/api/profile/search/withContacts/v0';

// DeleteUserChats
export type {
    PrivateChatSecondDeleteChatsOneVOneV0Request as DeleteUserChatsRequest,
    PrivateChatSecondDeleteChatsOneVOneV0Result as DeleteUserChatsResult,
    PrivateChatSecondDeleteChatsOneVOneV0Response as DeleteUserChatsResponse,
};

export const deleteUserChatsUrl =
    '/api/privateChatSecond/deleteChats/oneVOne/v0';
