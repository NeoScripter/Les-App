import {
    apiPostResult,
    type ApiPostOptions,
    type ApiResult,
} from './apiPostResult';

// BlockInput — блок сообщения (текст, картинка, видео, файл, ответ, кнопка-ссылка)
export type BlockInput = {
    type: string; // тип блока: text, technical, picture, video, file, reply, link_button
    content_text: string; // текст в формате markdown (для text, file, technical, link_button)
    picture_spoiler: boolean; // скрыта ли картинка под спойлером
    picture_file_id: string; // ID файла картинки
    video_spoiler: boolean; // скрыто ли видео под спойлером
    video_file_id: string; // ID файла видео
    file_spoiler: boolean; // скрыт ли файл под спойлером
    file_file_id: string; // ID файла
    reply_spoiler: boolean; // скрыт ли ответ под спойлером
    reply_place: string; // диапазон символов ответа, например "0:5;7:32"
    reply_message_version: number; // версия сообщения, на которое отвечают
    reply_message_id: string; // ID сообщения, на которое отвечают
    link_button_link: string; // ссылка для кнопки (для link_button)
};

// VisibilityInput — настройки видимости сообщения
export type VisibilityInput = {
    all: boolean; // видно всем (для 1v1 всегда true)
};

// PrivateChatSecondGetOrCreate1v1V0Request — запрос на получение или создание чата 1-на-1
export type PrivateChatSecondGetOrCreate1v1V0Request = {
    profile_id: string; // ID профиля, под которым действует пользователь
    target_profile_id: string; // ID профиля собеседника
};

// PrivateChatSecondGetOrCreate1v1V0Response — ответ с ID чата (существующего или созданного)
export type PrivateChatSecondGetOrCreate1v1V0Response = {
    chat_id: string; // ID чата
};

// PrivateChatSecondMessageSendV0Request — запрос на отправку сообщения в чат
export type PrivateChatSecondMessageSendV0Request = {
    profile_id: string; // ID профиля, под которым действует пользователь
    chat_id: string; // ID чата
    blocks: BlockInput[]; // массив блоков сообщения
    visibility: VisibilityInput; // настройки видимости сообщения
};

// PrivateChatSecondMessageSendV0Response — ответ на отправку сообщения
export type PrivateChatSecondMessageSendV0Response = {
    message_id: string; // ID отправленного сообщения
    ok: boolean; // признак успешности операции
};

// PrivateChatSecondMessageDeleteV0Request — запрос на удаление сообщения
export type PrivateChatSecondMessageDeleteV0Request = {
    profile_id: string; // ID профиля, под которым действует пользователь
    message_id: string; // ID удаляемого сообщения
};

// PrivateChatSecondMessageDeleteV0Response — ответ на удаление сообщения
export type PrivateChatSecondMessageDeleteV0Response = {
    ok: boolean; // признак успешности операции
};

// PrivateChatSecondMessageEditV0Request — запрос на редактирование сообщения
export type PrivateChatSecondMessageEditV0Request = {
    profile_id: string; // ID профиля, под которым действует пользователь
    message_id: string; // ID редактируемого сообщения
    blocks: BlockInput[]; // новый массив блоков сообщения
    visibility: VisibilityInput; // настройки видимости сообщения
};

// PrivateChatSecondMessageEditV0Response — ответ на редактирование сообщения
export type PrivateChatSecondMessageEditV0Response = {
    ok: boolean; // признак успешности операции
};

// PrivateChatSecondMessageGetIdsV0Request — запрос на получение ID сообщений в чате с позиционированием
export type PrivateChatSecondMessageGetIdsV0Request = {
    profile_id: string; // ID профиля, под которым действует пользователь
    chat_id: string; // ID чата
    current_read_message_id?: string | null; // ID сообщения текущего чтения (null — последнее в чате, пустая строка — не валидно)
};

// MessageIdInfo — информация об ID сообщения в диапазоне
export type MessageIdInfo = {
    message_id: string; // ID сообщения
    number: number; // номер сообщения в чате
    deleted: boolean; // удалено ли сообщение
    version?: number | null; // версия сообщения (null если deleted)
    sender_profile_id?: string | null; // ID профиля отправителя (null если deleted)
};

// ReadInfo — информация о прочитанном сообщении (текущее или последнее прочитанное)
export type ReadInfo = {
    message_id: string; // ID сообщения
    number: number; // номер сообщения в чате
    deleted: boolean; // удалено ли сообщение
    version?: number | null; // версия сообщения (null если deleted)
    sender_profile_id?: string | null; // ID профиля отправителя (null если deleted)
};

// PrivateChatSecondMessageGetIdsV0Response — ответ с информацией о позиционировании в чате
export type PrivateChatSecondMessageGetIdsV0Response = {
    messages_in_between: MessageIdInfo[]; // сообщения в диапазоне
    current_read: ReadInfo; // текущее читаемое сообщение
    last_read: ReadInfo; // последнее прочитанное сообщение
    remains_read_from_current_read_position: number; // сколько ещё прочитать с позиции current_read (не включая)
    remains_read_from_last_read_position: number; // сколько ещё прочитать с позиции last_read (не включая)
    back_read_from_current_read_position: number; // сколько уже прочитано до current_read включительно
    back_read_from_last_read_position: number; // сколько уже прочитано до last_read включительно
};

// PrivateChatSecondMessageGetByIdsV0Request — запрос на получение сообщений по списку ID
export type PrivateChatSecondMessageGetByIdsV0Request = {
    profile_id: string; // ID профиля, под которым действует пользователь
    chat_id: string; // ID чата
    message_ids: string[]; // список ID сообщений
};

// BlockOutput — блок сообщения в ответе (поля опциональны в зависимости от типа блока)
export type BlockOutput = {
    type: string; // тип блока: text, technical, picture, video, file, reply, link_button
    content_text?: string | null; // текст в формате markdown (null если не text/file/technical/link_button)
    picture_spoiler?: boolean | null; // скрыта ли картинка под спойлером (null если не picture)
    picture_file_id?: string | null; // ID файла картинки (null если не picture)
    video_spoiler?: boolean | null; // скрыто ли видео под спойлером (null если не video)
    video_file_id?: string | null; // ID файла видео (null если не video)
    file_spoiler?: boolean | null; // скрыт ли файл под спойлером (null если не file)
    file_file_id?: string | null; // ID файла (null если не file)
    reply_spoiler?: boolean | null; // скрыт ли reply блок под спойлером (null если не reply)
    reply_place?: string | null; // диапазон символов ответа (null если не reply)
    reply_message_version?: number | null; // версия сообщения, на которое отвечают (null если не reply)
    reply_message_id?: string | null; // ID сообщения, на которое отвечают (null если не reply)
    link_button_link?: string | null; // ссылка для кнопки (null если не link_button)
};

// VisibilityOutput — настройки видимости сообщения в ответе
export type VisibilityOutput = {
    all: boolean; // видно всем
};

// MessageInfo — полная информация о сообщении
export type MessageInfo = {
    id: string; // ID сообщения
    deleted: boolean; // удалено ли сообщение
    version?: number | null; // версия сообщения (null если deleted)
    last_edited_at?: string | null; // время последнего редактирования (null если deleted или не менялось)
    sender_profile_id?: string | null; // ID профиля отправителя (null если deleted)
    blocks?: BlockOutput[] | null; // блоки сообщения (null если deleted)
    visibility?: VisibilityOutput | null; // видимость сообщения (null если deleted)
};

// FileInfo — информация о файле, используемом в сообщениях
export type FileInfo = {
    id: string; // ID файла
    file_name: string; // имя файла
    content_type: string; // MIME-тип файла
    unique_key_hash: string; // хешированный уникальный ключ доступа
    comphash: string; // композитный хеш файла
};

// PrivateChatSecondMessageGetByIdsV0Response — ответ со списком сообщений и информацией о файлах
export type PrivateChatSecondMessageGetByIdsV0Response = {
    messages: MessageInfo[]; // список сообщений
    files: FileInfo[]; // информация о файлах, используемых в сообщениях
};

// PrivateChatSecondGetChatsOneVOneV0Request — запрос на получение списка чатов 1-на-1 для профилей пользователя
export type PrivateChatSecondGetChatsOneVOneV0Request = {
    current_profiles: string[]; // список ID профилей пользователя
};

// ChatInfo — информация о чате 1-на-1
export type ChatInfo = {
    chat_id: string; // ID чата
    profile_id: string; // ID профиля, с которого идёт переписка
    interlocutor_id: string; // ID собеседника
    last_read_message_id?: string | null; // ID последнего прочитанного сообщения (null если нет)
};

// PrivateChatSecondGetChatsOneVOneV0Response — ответ со списком чатов, отсортированным по времени последнего сообщения
export type PrivateChatSecondGetChatsOneVOneV0Response = {
    chats: ChatInfo[]; // список чатов
};

// privateChatSecondGetOrCreate1v1V0 — получение существующего или создание нового чата 1-на-1 с собеседником
// POST /api/privateChatSecond/getOrCreate/1v1/v0
export async function privateChatSecondGetOrCreate1v1V0(
    body: PrivateChatSecondGetOrCreate1v1V0Request,
    options?: ApiPostOptions,
): Promise<ApiResult<PrivateChatSecondGetOrCreate1v1V0Response>> {
    return apiPostResult<PrivateChatSecondGetOrCreate1v1V0Response>(
        '/api/privateChatSecond/getOrCreate/1v1/v0',
        body,
        options,
    );
}

// privateChatSecondMessageSendV0 — отправка сообщения в чат
// POST /api/privateChatSecond/message/send/v0
export async function privateChatSecondMessageSendV0(
    body: PrivateChatSecondMessageSendV0Request,
    options?: ApiPostOptions,
): Promise<ApiResult<PrivateChatSecondMessageSendV0Response>> {
    return apiPostResult<PrivateChatSecondMessageSendV0Response>(
        '/api/privateChatSecond/message/send/v0',
        body,
        options,
    );
}

// privateChatSecondMessageDeleteV0 — удаление сообщения из чата
// POST /api/privateChatSecond/message/delete/v0
export async function privateChatSecondMessageDeleteV0(
    body: PrivateChatSecondMessageDeleteV0Request,
    options?: ApiPostOptions,
): Promise<ApiResult<PrivateChatSecondMessageDeleteV0Response>> {
    return apiPostResult<PrivateChatSecondMessageDeleteV0Response>(
        '/api/privateChatSecond/message/delete/v0',
        body,
        options,
    );
}

// privateChatSecondMessageEditV0 — редактирование сообщения в чате
// POST /api/privateChatSecond/message/edit/v0
export async function privateChatSecondMessageEditV0(
    body: PrivateChatSecondMessageEditV0Request,
    options?: ApiPostOptions,
): Promise<ApiResult<PrivateChatSecondMessageEditV0Response>> {
    return apiPostResult<PrivateChatSecondMessageEditV0Response>(
        '/api/privateChatSecond/message/edit/v0',
        body,
        options,
    );
}

// privateChatSecondMessageGetIdsV0 — получение ID сообщений в чате с информацией о позиционировании (текущее, последнее прочитанное, сколько осталось прочитать)
// POST /api/privateChatSecond/message/getIds/v0
export async function privateChatSecondMessageGetIdsV0(
    body: PrivateChatSecondMessageGetIdsV0Request,
    options?: ApiPostOptions,
): Promise<ApiResult<PrivateChatSecondMessageGetIdsV0Response>> {
    return apiPostResult<PrivateChatSecondMessageGetIdsV0Response>(
        '/api/privateChatSecond/message/getIds/v0',
        body,
        options,
    );
}

// privateChatSecondMessageGetByIdsV0 — получение сообщений по списку ID с полной информацией и данными о файлах
// POST /api/privateChatSecond/message/getByIds/v0
export async function privateChatSecondMessageGetByIdsV0(
    body: PrivateChatSecondMessageGetByIdsV0Request,
    options?: ApiPostOptions,
): Promise<ApiResult<PrivateChatSecondMessageGetByIdsV0Response>> {
    return apiPostResult<PrivateChatSecondMessageGetByIdsV0Response>(
        '/api/privateChatSecond/message/getByIds/v0',
        body,
        options,
    );
}

// TODO: 2. Get all the current user's chats
// privateChatSecondGetChatsOneVOneV0 — получение списка всех чатов 1-на-1 для профилей пользователя, отсортированных по времени последнего сообщения
// POST /api/privateChatSecond/getChats/oneVOne/v0
export async function privateChatSecondGetChatsOneVOneV0(
    body: PrivateChatSecondGetChatsOneVOneV0Request,
    options?: ApiPostOptions,
): Promise<ApiResult<PrivateChatSecondGetChatsOneVOneV0Response>> {
    return apiPostResult<PrivateChatSecondGetChatsOneVOneV0Response>(
        '/api/privateChatSecond/getChats/oneVOne/v0',
        body,
        options,
    );
}
