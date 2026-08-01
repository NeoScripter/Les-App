export const baseUrl = import.meta.env.DEV
    ? 'http://62.113.114.15:8040'
    : 'https://les.app';

    // ? 'https://les.myfantasy.ru'


export const CACHE_LIFETIME_MS = 0;

export const CACHE_KEYS = {
    USER_CHAT_IDS: 'user_chat_ids',
    PROFILE_FIELDS: 'profile_fields',
}
