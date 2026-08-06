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
    PrivateChatSecondMessageSendV0RequestVisibilityInput,
    PrivateChatSecondMessageSendV0Response,
    PrivateChatSecondMessageSendV0Result,
} from '../../../../services/public-api-union/chat_private_chat_second';
import type {
    ContainerAddFileV0Response,
    ContainerAddFileV0Request,
    ContainerAddFileV0Result,
    ContainerCreateV0Result,
    ContainerCreateV0Request,
    ContainerCreateV0Response,
} from '@/services/public-api-union/common-functions_file_storage';

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
    PrivateChatSecondMessageSendV0RequestBlockInput as ChatBlockInput,
    PrivateChatSecondMessageSendV0RequestVisibilityInput as ChatInputVisibility,
    PrivateChatSecondDeleteChatsOneVOneV0Request as DeleteUserChatsRequest,
    PrivateChatSecondDeleteChatsOneVOneV0Response as DeleteUserChatsResponse,
    PrivateChatSecondDeleteChatsOneVOneV0Result as DeleteUserChatsResult,
};

export const deleteUserChatsUrl =
    '/api/privateChatSecond/deleteChats/oneVOne/v0';

interface TextBlock {
    readonly type: 'text' | 'technical';
    readonly content_text: PrivateChatSecondMessageSendV0RequestBlockInput['content_text'];
}

interface PictureBlock {
    readonly type: 'picture';
    readonly picture_spoiler: PrivateChatSecondMessageSendV0RequestBlockInput['picture_spoiler'];
    readonly picture_file_id: PrivateChatSecondMessageSendV0RequestBlockInput['picture_file_id'];
}

interface VideoBlock {
    readonly type: 'video';
    readonly video_spoiler: PrivateChatSecondMessageSendV0RequestBlockInput['video_spoiler'];
    readonly video_file_id: PrivateChatSecondMessageSendV0RequestBlockInput['video_file_id'];
}

export interface FileBlock {
    readonly type: 'file';
    readonly content_text: PrivateChatSecondMessageSendV0RequestBlockInput['content_text'];
    readonly file_spoiler: PrivateChatSecondMessageSendV0RequestBlockInput['file_spoiler'];
    readonly file_file_id: PrivateChatSecondMessageSendV0RequestBlockInput['file_file_id'];
}

interface ReplyBlock {
    readonly type: 'reply';
    readonly reply_spoiler: PrivateChatSecondMessageSendV0RequestBlockInput['reply_spoiler'];
    readonly reply_place: PrivateChatSecondMessageSendV0RequestBlockInput['reply_place'];
    readonly reply_message_version: PrivateChatSecondMessageSendV0RequestBlockInput['reply_message_version'];
    readonly reply_message_id: PrivateChatSecondMessageSendV0RequestBlockInput['reply_message_id'];
}

interface LinkButtonBlock {
    readonly type: 'link_button';
    readonly content_text: PrivateChatSecondMessageSendV0RequestBlockInput['content_text'];
    readonly link_button_link: PrivateChatSecondMessageSendV0RequestBlockInput['link_button_link'];
}

export type SendMessageBlock =
    | TextBlock
    | PictureBlock
    | VideoBlock
    | FileBlock
    | ReplyBlock
    | LinkButtonBlock;

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

export type {
    ContainerAddFileV0Request as ContainerAddFileRequest,
    ContainerAddFileV0Response as ContainerAddFileResponse,
    ContainerAddFileV0Result as ContainerAddFileResult,
    ContainerCreateV0Request as ContainerCreateRequest,
    ContainerCreateV0Response as ContainerCreateResponse,
    ContainerCreateV0Result as ContainerCreateResult,
};

export const containerCreateUrl = '/api/fileStorage/container/create/v0';
export const containerAddFileUrl = '/api/fileStorage/container/addFile/v0';
