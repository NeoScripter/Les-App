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
    PrivateChatSecondMessageGetByIdsV0ResponseMessageInfo,
    PrivateChatSecondMessageGetByIdsV0Result,
    PrivateChatSecondMessageGetIdsV0Request,
    PrivateChatSecondMessageGetIdsV0Response,
    PrivateChatSecondMessageGetIdsV0Result,
    PrivateChatSecondMessageSendV0Request,
    PrivateChatSecondMessageSendV0RequestBlockInput,
    PrivateChatSecondMessageSendV0Response,
    PrivateChatSecondMessageSendV0Result,
} from '../../../../services/public-api-union/chat_private_chat_second';

// ============================================
// Re-exports with aliases (Method 4)
// ============================================

// GetUserChatIds
export type {
    PrivateChatSecondGetChatsOneVOneV0Request as GetUserChatIdsRequest,
    PrivateChatSecondGetChatsOneVOneV0Response as GetUserChatIdsResponse,
    PrivateChatSecondGetChatsOneVOneV0Result as GetUserChatIdsResult,
    PrivateChatSecondGetChatsOneVOneV0ResponseChatInfo as PrivateChatInfo,
};

export const getUserChatIdsUrl = '/api/privateChatSecond/getChats/oneVOne/v0';

// GetProfileFields
export type {
    ProfileViewOthersRequiredFieldsV0ResponseNamingData as ContactInfo,
    ProfileViewOthersRequiredFieldsV0Request as GetProfileFieldsRequest,
    ProfileViewOthersRequiredFieldsV0Response as GetProfileFieldsResponse,
    ProfileViewOthersRequiredFieldsV0Result as GetProfileFieldsResult,
    ProfileViewOthersRequiredFieldsV0ResponseProfileLook as ProfileFields,
};

export const getProfileFieldsUrl = '/api/profile/view/others/requiredFields/v0';

// GetChatMessageIds
export type {
    PrivateChatSecondMessageGetIdsV0Request as GetChatMessageIdsRequest,
    PrivateChatSecondMessageGetIdsV0Response as GetChatMessageIdsResponse,
    PrivateChatSecondMessageGetIdsV0Result as GetChatMessageIdsResult,
};

export const getChatMessageIdsUrl = '/api/privateChatSecond/message/getIds/v0';

// GetChatMessages
export type {
    PrivateChatSecondMessageGetByIdsV0ResponseMessageInfo as ChatMessageType,
    PrivateChatSecondMessageGetByIdsV0Request as GetChatMessagesRequest,
    PrivateChatSecondMessageGetByIdsV0Response as GetChatMessagesResponse,
    PrivateChatSecondMessageGetByIdsV0Result as GetChatMessagesResult,
};

export const getChatMessagesUrl = '/api/privateChatSecond/message/getByIds/v0';

// AddUserToContacts
export type {
    ProfileRelationshipContactAddV0Request as AddUserToContactsRequest,
    ProfileRelationshipContactAddV0Response as AddUserToContactsResponse,
    ProfileRelationshipContactAddV0Result as AddUserToContactsResult,
};

export const addUserToContactsUrl = '/api/profilesRelationship/contact/add/v0';

// SearchNewChatProfiles
export type {
    ProfileSearchWithContactsV0Request as SearchNewChatProfilesRequest,
    ProfileSearchWithContactsV0Response as SearchNewChatProfilesResponse,
    ProfileSearchWithContactsV0Result as SearchNewChatProfilesResult,
};

export const searchNewChatProfilesUrl = '/api/profile/search/withContacts/v0';

// DeleteUserChats
export type {
    PrivateChatSecondDeleteChatsOneVOneV0Request as DeleteUserChatsRequest,
    PrivateChatSecondDeleteChatsOneVOneV0Response as DeleteUserChatsResponse,
    PrivateChatSecondDeleteChatsOneVOneV0Result as DeleteUserChatsResult,
};

export const deleteUserChatsUrl =
    '/api/privateChatSecond/deleteChats/oneVOne/v0';

type BlockOf<
    T extends string,
    K extends keyof PrivateChatSecondMessageSendV0RequestBlockInput,
> = Pick<PrivateChatSecondMessageSendV0RequestBlockInput, K> & {
    readonly type: T;
};

// PrivateChatSecondMessageSendV0Request
export type SendMessageBlock =
    | BlockOf<'text', 'content_text'>
    | BlockOf<'technical', 'content_text'>
    | BlockOf<'picture', 'picture_spoiler' | 'picture_file_id'>
    | BlockOf<'video', 'video_spoiler' | 'video_file_id'>
    | BlockOf<'file', 'content_text' | 'file_spoiler' | 'file_file_id'>
    | BlockOf<
          'reply',
          | 'reply_spoiler'
          | 'reply_place'
          | 'reply_message_version'
          | 'reply_message_id'
      >
    | BlockOf<'link_button', 'content_text' | 'link_button_link'>;

export type SendMessageRequest = Omit<
    PrivateChatSecondMessageSendV0Request,
    'blocks'
> & {
    blocks: SendMessageBlock[];
};

export type {
    PrivateChatSecondMessageSendV0Response as SendMessageResponse,
    PrivateChatSecondMessageSendV0Result as SendMessageResult,
};

export const sendMessageUrl = '/api/privateChatSecond/message/send/v0';
