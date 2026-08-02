export const baseUrl = import.meta.env.DEV
    ? 'http://62.113.114.15:8040'
    : 'https://les.app';

    // ? 'https://les.myfantasy.ru'


export const CACHE_LIFETIME_MS = 0;

export const CACHE_KEYS = {
    USER_CHAT_IDS: 'user_chat_ids',
    PROFILE_FIELDS: 'profile_fields',
    USER_CONTACTS: 'user_contacts',
    CHAT_MESSAGE_IDS: 'chat_message_ids',
    CHAT_MESSAGES: 'chat_messages',
}
