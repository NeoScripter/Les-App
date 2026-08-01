import type { ContactInfo, ProfileFields } from '../api/chats';

export type ContactItemDTO = {
    name: string;
    lastMessage: string | null;
    avatar: string | null;
    unread: number;
    profileId: string;
    initials: string;
} | null;

// /api/fileStorage/file/getContentByUniqueKey/v0?file_id=value&unique_key_hash=value&comphash=value

export default function convertToContactItemDTO(item: ProfileFields): ContactItemDTO {
    if (item.has_blocking_state) {
        return null;
    }

    let avatar = null;

    if (item.avatars.length > 0) {
        const avatarData = item.avatars[0];
        avatar = `/api/fileStorage/file/getContentByUniqueKey/v0?file_id=${avatarData.file_id}&unique_key_hash=${avatarData.unique_key_hash}&comphash=${avatarData.comphash}`;
    }
    const profileId = item.for_profile_id;
    let name = item.name as string;
    let initials = name.at(0) as string;
    if (
        item.relationship_state &&
        item.relationship_state.contact &&
        item.relationship_state.contact.has
    ) {
        const contact = item.relationship_state.contact.contact as ContactInfo;
        const f_name = contact.first_name,
            l_name = contact.last_name;

        name = `${f_name} ${l_name}`;
        initials = `${f_name?.at(0)}${l_name?.at(0)}` as string;
    }

    let lastMessage = null;
    let unread = 0;
    if (item.one_v_one_chat && item.one_v_one_chat.has) {
        const privateChat = item.one_v_one_chat;

        if (typeof privateChat.unread_count === 'number') {
            unread = privateChat.unread_count;
        }

        if (
            privateChat.last_message &&
            privateChat.last_message.blocks.length > 0 &&
            privateChat.last_message.blocks[0].content_text
        ) {
            lastMessage = privateChat.last_message.blocks[0].content_text;
        }
    }

    const contact: ContactItemDTO = {
        name,
        lastMessage,
        unread,
        profileId,
        avatar,
        initials
    };

    return contact;
}
