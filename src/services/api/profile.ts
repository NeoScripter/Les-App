import {
    apiPostResult,
    type ApiPostOptions,
    type ApiResult,
} from './apiPostResult';

// CreateProfileV0Request — запрос на создание профиля
export type CreateProfileV0Request = {
    nickname: string; // никнейм профиля
    name: string; // имя профиля
    user_ids: string[]; // список ID пользователей, привязанных к профилю
    self_description: string; // описание профиля (о себе)
    container_id: string; // ID контейнера для файлов (аватар)
};

// CreateProfileV0Response — ответ на создание профиля
export type CreateProfileV0Response = {
    profile_id: string; // ID созданного профиля
    ok: boolean; // признак успешности операции
};

// GetMyProfilesV0Request — запрос на получение списка профилей текущего пользователя
export type GetMyProfilesV0Request = {};

// ProfileShortInfo — краткая информация о профиле
export type ProfileShortInfo = {
    profile_id: string; // ID профиля
    nickname: string; // никнейм профиля
    name: string; // имя профиля
    self_description: string; // описание профиля (о себе)
    created_at: string; // дата создания профиля
};

// AvatarFileInfo — информация о файле аватара
export type AvatarFileInfo = {
    is_processing: boolean; // находится ли файл в обработке
    unique_key_hash: string; // хеш уникального ключа для доступа к файлу
    comphash: string; // композитный хеш файла
    file_id: string; // ID файла
};

// ProfileAvatarFileInfo — связка профиля и информации об аватаре
export type ProfileAvatarFileInfo = {
    profile_id: string; // ID профиля
    file_info: AvatarFileInfo; // информация о файле аватара
};

// GetMyProfilesV0Response — ответ со списком профилей текущего пользователя
export type GetMyProfilesV0Response = {
    profiles: ProfileShortInfo[]; // список профилей пользователя
    file_info_by_profile_id: ProfileAvatarFileInfo[]; // информация о файлах аватаров для каждого профиля
    ok: boolean; // признак успешности операции
};

// UpdateProfileV0Request — запрос на обновление данных профиля
export type UpdateProfileV0Request = {
    profile_id: string; // ID обновляемого профиля
    nickname: string; // новый никнейм
    name: string; // новое имя
    user_ids: string[]; // новый список ID пользователей
    self_description: string; // новое описание (о себе)
    container_id: string; // новый ID контейнера для файлов (аватар)
};

// UpdateProfileV0Response — ответ на обновление профиля
export type UpdateProfileV0Response = {
    ok: boolean; // признак успешности операции
};

// DeleteProfileV0Request — запрос на удаление профиля
export type DeleteProfileV0Request = {
    profile_id: string; // ID удаляемого профиля
};

// DeleteProfileV0Response — ответ на удаление профиля
export type DeleteProfileV0Response = {
    ok: boolean; // признак успешности операции
};

// AdminRecoverProfileV0Request — запрос администратора на восстановление удалённого профиля
export type AdminRecoverProfileV0Request = {
    profile_id: string; // ID восстанавливаемого профиля
};

// AdminRecoverProfileV0Response — ответ на восстановление профиля администратором
export type AdminRecoverProfileV0Response = {
    ok: boolean; // признак успешности операции
};

// AdminFindProfileByNicknameV0Request — запрос администратора на поиск профиля по никнейму
export type AdminFindProfileByNicknameV0Request = {
    nickname: string; // никнейм для поиска
};

// ProfileFullInfo — полная информация о профиле (для администратора)
export type ProfileFullInfo = {
    profile_id: string; // ID профиля
    nickname: string; // никнейм профиля
    name: string; // имя профиля
    user_ids: string[]; // список ID пользователей, привязанных к профилю
    self_description: string; // описание профиля (о себе)
    created_at: string; // дата создания профиля
    updated_at: string; // дата последнего обновления профиля
    deleted: boolean; // удалён ли профиль
};

// AdminFindProfileByNicknameV0Response — ответ администратору со списком найденных профилей
export type AdminFindProfileByNicknameV0Response = {
    profiles: ProfileFullInfo[]; // список найденных профилей с полной информацией
    file_info_by_profile_id: ProfileAvatarFileInfo[]; // информация о файлах аватаров
};

// FindProfileByNicknameV0Request — запрос на публичный поиск профиля по никнейму
export type FindProfileByNicknameV0Request = {
    nickname: string; // никнейм для поиска
};

// ProfileInfo — публичная информация о профиле
export type ProfileInfo = {
    profile_id: string; // ID профиля
    nickname: string; // никнейм профиля
    name: string; // имя профиля
    self_description: string; // описание профиля (о себе)
    created_at: string; // дата создания профиля
};

// FindProfileByNicknameV0Response — ответ на публичный поиск профиля по никнейму
export type FindProfileByNicknameV0Response = {
    profiles: ProfileInfo[]; // список найденных профилей
    file_info_by_profile_id: ProfileAvatarFileInfo[]; // информация о файлах аватаров
};

// GetProfileByIDV0Request — запрос на получение профиля по ID
export type GetProfileByIDV0Request = {
    profile_id: string; // ID запрашиваемого профиля
};

// GetProfileByIDV0ResponseProfileInfo — детальная информация о профиле по ID (включает user_ids)
export type GetProfileByIDV0ResponseProfileInfo = {
    profile_id: string; // ID профиля
    nickname: string; // никнейм профиля
    name: string; // имя профиля
    self_description: string; // описание профиля (о себе)
    user_ids: string[]; // список ID пользователей, привязанных к профилю
    created_at: string; // дата создания профиля
};

// GetProfileByIDV0Response — ответ с детальной информацией о профиле
export type GetProfileByIDV0Response = {
    profile: GetProfileByIDV0ResponseProfileInfo; // информация о профиле
    file_info: AvatarFileInfo; // информация о файле аватара
    ok: boolean; // признак успешности операции
};

// ProfileCurrentStateV0Request — запрос на получение текущего состояния профилей пользователя (текущая сессия)
export type ProfileCurrentStateV0Request = {};

// ProfileCurrentStateV0ResponseProfileShortInfo — краткая информация о профиле с признаком активности
export type ProfileCurrentStateV0ResponseProfileShortInfo = {
    profile_id: string; // ID профиля
    nickname: string; // никнейм профиля
    name: string; // имя профиля
    active: boolean; // активен ли профиль в данный момент
};

// ProfileCurrentStateV0Response — ответ с текущим состоянием профилей
export type ProfileCurrentStateV0Response = {
    profiles: ProfileCurrentStateV0ResponseProfileShortInfo[]; // список профилей с признаками активности
};

// GetProfileSettingsV0Request — запрос на получение настроек профилей
export type GetProfileSettingsV0Request = {};

// GetProfileSettingsV0Response — ответ с настройками профилей (максимальное количество)
export type GetProfileSettingsV0Response = {
    max_profile_count: number; // максимальное количество профилей, которое может создать пользователь
};

// ProfileGetPublicByIDsV0Request — запрос на получение публичной информации о профилях по списку ID
export type ProfileGetPublicByIDsV0Request = {
    profile_ids: string[]; // список ID запрашиваемых профилей
};

// ProfilePublicInfo — публичная информация о профиле (включает deleted_at)
export type ProfilePublicInfo = {
    profile_id: string; // ID профиля
    nickname: string; // никнейм профиля
    name: string; // имя профиля
    self_description: string; // описание профиля (о себе)
    created_at: string; // дата создания профиля
    deleted_at: string; // дата удаления профиля (если удалён)
};

// ProfileGetPublicByIDsV0Response — ответ с публичной информацией о запрошенных профилях
export type ProfileGetPublicByIDsV0Response = {
    profiles: ProfilePublicInfo[]; // список профилей с публичной информацией
    file_info_by_profile_id: ProfileAvatarFileInfo[]; // информация о файлах аватаров
    ok: boolean; // признак успешности операции
};

// ActiveProfilesGetV0Request — запрос на получение списка активных профилей (текущий выбор пользователей)
export type ActiveProfilesGetV0Request = {};

// ActiveProfilesGetV0ResponseProfileShortInfo — краткая информация о доступном профиле
export type ActiveProfilesGetV0ResponseProfileShortInfo = {
    profile_id: string; // ID профиля
    nickname: string; // никнейм профиля
    name: string; // имя профиля
};

// ActiveProfileByUser — информация о выбранных профилях конкретного пользователя
export type ActiveProfileByUser = {
    user_id: string; // ID пользователя
    profiles: ActiveProfilesGetV0ResponseProfileShortInfo[]; // список выбранных профилей
};

// CompiledProfile — скомпилированная информация о профиле (объединённые данные)
export type CompiledProfile = {
    profile_id: string; // ID профиля
    nickname: string; // никнейм профиля
    name: string; // имя профиля
    user_ids: string[]; // список ID пользователей, привязанных к профилю
};

// ActiveProfilesGetV0Response — ответ со списками доступных, выбранных и скомпилированных профилей
export type ActiveProfilesGetV0Response = {
    available_profiles: ActiveProfilesGetV0ResponseProfileShortInfo[]; // доступные для выбора профили
    selected_profiles: ActiveProfileByUser[]; // выбранные профили по пользователям
    compiled_profiles: CompiledProfile[]; // скомпилированные профили
};

// ActiveProfilesSetV0Request — запрос на установку активных профилей для текущего пользователя
export type ActiveProfilesSetV0Request = {
    profile_ids: string[]; // список ID профилей, которые нужно сделать активными
};

// ActiveProfilesSetV0Response — ответ на установку активных профилей
export type ActiveProfilesSetV0Response = {};

// ActiveProfilesSetForUserV0Request — запрос на установку активных профилей для указанного пользователя
export type ActiveProfilesSetForUserV0Request = {
    user_id: string; // ID пользователя, для которого устанавливаются профили
    profile_ids: string[]; // список ID профилей
};

// ActiveProfilesSetForUserV0Response — ответ на установку активных профилей для пользователя
export type ActiveProfilesSetForUserV0Response = {};

// ProfilesRightsGetListV0Request — запрос на получение списка групп прав и прав
export type ProfilesRightsGetListV0Request = {};

// RightGroupInfo — информация о группе прав
export type RightGroupInfo = {
    code: string; // код группы прав
    name: string; // название группы прав
    description: string; // описание группы прав
};

// RightInfo — информация о конкретном праве
export type RightInfo = {
    name: string; // название права
    code: string; // код права
    description: string; // описание права
    group_code: string; // код группы прав, к которой относится данное право
};

// ProfilesRightsGetListV0Response — ответ со списком групп прав и прав
export type ProfilesRightsGetListV0Response = {
    groups: RightGroupInfo[]; // список групп прав
    rights: RightInfo[]; // список прав
};

// UserRight — право пользователя (список кодов разрешений)
export type UserRight = {
    permission_codes: string[]; // список кодов разрешений
};

// ProfilesRightsSetV0Request — запрос на установку прав пользователя в профиле
export type ProfilesRightsSetV0Request = {
    profile_id: string; // ID профиля
    user_id: string; // ID пользователя
    group_code: string; // код группы прав
    user_rights: UserRight[]; // список прав пользователя
};

// ProfilesRightsSetV0Response — ответ на установку прав
export type ProfilesRightsSetV0Response = {};

// ProfilesRightsGetV0Request — запрос на получение прав пользователей в профиле
export type ProfilesRightsGetV0Request = {
    profile_id: string; // ID профиля
};

// ProfilesRightsGetV0ResponseUserRight — права конкретного пользователя в профиле
export type ProfilesRightsGetV0ResponseUserRight = {
    user_id: string; // ID пользователя
    permission_codes: string[]; // список кодов разрешений
};

// ProfilesRightsGetV0Response — ответ с правами пользователей в профиле
export type ProfilesRightsGetV0Response = {
    profile_id: string; // ID профиля
    user_rights: ProfilesRightsGetV0ResponseUserRight[]; // список прав пользователей
};

// ProfileSearchV0Request — запрос на поиск профилей по никнейму или фрагменту номера телефона
export type ProfileSearchV0Request = {
    search: string; // строка поиска (никнейм или фрагмент номера телефона)
    search_limit: number; // максимальное количество результатов
};

// ProfileSearchInfo — информация о профиле в результатах поиска
export type ProfileSearchInfo = {
    profile_id: string; // ID профиля
    nickname: string; // никнейм профиля
    name: string; // имя профиля
    self_description: string; // описание профиля (о себе)
};

// ProfileSearchV0Response — ответ на поиск профилей
export type ProfileSearchV0Response = {
    profiles: ProfileSearchInfo[]; // список найденных профилей
    file_info_by_profile_id: ProfileAvatarFileInfo[]; // информация о файлах аватаров
    ok: boolean; // признак успешности операции
};

// createProfileV0 — создание нового профиля
// POST /api/profile/create/v0
export async function createProfileV0(
    body: CreateProfileV0Request,
    options?: ApiPostOptions,
): Promise<ApiResult<CreateProfileV0Response>> {
    return apiPostResult<CreateProfileV0Response>(
        '/api/profile/create/v0',
        body,
        options,
    );
}

// getMyProfilesV0 — получение списка профилей текущего пользователя
// TODO: 1. Get all the current user's profiles
// POST /api/profile/getMy/v0
export async function getMyProfilesV0(
    options?: ApiPostOptions,
): Promise<ApiResult<GetMyProfilesV0Response>> {
    return apiPostResult<GetMyProfilesV0Response>(
        '/api/profile/getMy/v0',
        {},
        options,
    );
}

// updateProfileV0 — обновление данных профиля
// POST /api/profile/update/v0
export async function updateProfileV0(
    body: UpdateProfileV0Request,
    options?: ApiPostOptions,
): Promise<ApiResult<UpdateProfileV0Response>> {
    return apiPostResult<UpdateProfileV0Response>(
        '/api/profile/update/v0',
        body,
        options,
    );
}

// deleteProfileV0 — удаление профиля
// POST /api/profile/delete/v0
export async function deleteProfileV0(
    body: DeleteProfileV0Request,
    options?: ApiPostOptions,
): Promise<ApiResult<DeleteProfileV0Response>> {
    return apiPostResult<DeleteProfileV0Response>(
        '/api/profile/delete/v0',
        body,
        options,
    );
}

// adminRecoverProfileV0 — восстановление удалённого профиля (только для администратора)
// POST /api/profile/admin/recover/v0
export async function adminRecoverProfileV0(
    body: AdminRecoverProfileV0Request,
    options?: ApiPostOptions,
): Promise<ApiResult<AdminRecoverProfileV0Response>> {
    return apiPostResult<AdminRecoverProfileV0Response>(
        '/api/profile/admin/recover/v0',
        body,
        options,
    );
}

// adminFindProfileByNicknameV0 — поиск профиля по никнейму (только для администратора, возвращает полную информацию)
// POST /api/profile/admin/findByNickname/v0
export async function adminFindProfileByNicknameV0(
    body: AdminFindProfileByNicknameV0Request,
    options?: ApiPostOptions,
): Promise<ApiResult<AdminFindProfileByNicknameV0Response>> {
    return apiPostResult<AdminFindProfileByNicknameV0Response>(
        '/api/profile/admin/findByNickname/v0',
        body,
        options,
    );
}

// findProfileByNicknameV0 — публичный поиск профиля по никнейму (возвращает ограниченную информацию)
// POST /api/profile/findByNickname/v0
export async function findProfileByNicknameV0(
    body: FindProfileByNicknameV0Request,
    options?: ApiPostOptions,
): Promise<ApiResult<FindProfileByNicknameV0Response>> {
    return apiPostResult<FindProfileByNicknameV0Response>(
        '/api/profile/findByNickname/v0',
        body,
        options,
    );
}

// getProfileByIDV0 — получение детальной информации о профиле по его ID
// POST /api/profile/getByID/v0
export async function getProfileByIDV0(
    body: GetProfileByIDV0Request,
    options?: ApiPostOptions,
): Promise<ApiResult<GetProfileByIDV0Response>> {
    return apiPostResult<GetProfileByIDV0Response>(
        '/api/profile/getByID/v0',
        body,
        options,
    );
}

// profileCurrentStateV0 — получение текущего состояния профилей пользователя (какой профиль активен)
// POST /api/auth/profileCurrentState
export async function profileCurrentStateV0(
    options?: ApiPostOptions,
): Promise<ApiResult<ProfileCurrentStateV0Response>> {
    return apiPostResult<ProfileCurrentStateV0Response>(
        '/api/auth/profileCurrentState',
        {},
        options,
    );
}

// getProfileSettingsV0 — получение настроек профилей (например, максимальное количество профилей)
// POST /api/profile/settings/v0
export async function getProfileSettingsV0(
    options?: ApiPostOptions,
): Promise<ApiResult<GetProfileSettingsV0Response>> {
    return apiPostResult<GetProfileSettingsV0Response>(
        '/api/profile/settings/v0',
        {},
        options,
    );
}

// profileGetPublicByIDsV0 — получение публичной информации о профилях по списку ID
// POST /api/profile/getPulicByIDs/v0
export async function profileGetPublicByIDsV0(
    body: ProfileGetPublicByIDsV0Request,
    options?: ApiPostOptions,
): Promise<ApiResult<ProfileGetPublicByIDsV0Response>> {
    return apiPostResult<ProfileGetPublicByIDsV0Response>(
        '/api/profile/getPulicByIDs/v0',
        body,
        options,
    );
}

// activeProfilesGetV0 — получение списка активных профилей (доступные, выбранные, скомпилированные)
// POST /api/activeProfiles/get/v0
export async function activeProfilesGetV0(
    options?: ApiPostOptions,
): Promise<ApiResult<ActiveProfilesGetV0Response>> {
    return apiPostResult<ActiveProfilesGetV0Response>(
        '/api/activeProfiles/get/v0',
        {},
        options,
    );
}

// activeProfilesSetV0 — установка активных профилей для текущего пользователя
// POST /api/activeProfiles/set/v0
export async function activeProfilesSetV0(
    body: ActiveProfilesSetV0Request,
    options?: ApiPostOptions,
): Promise<ApiResult<ActiveProfilesSetV0Response>> {
    return apiPostResult<ActiveProfilesSetV0Response>(
        '/api/activeProfiles/set/v0',
        body,
        options,
    );
}

// activeProfilesSetForUserV0 — установка активных профилей для указанного пользователя
// POST /api/activeProfiles/setForUser/v0
export async function activeProfilesSetForUserV0(
    body: ActiveProfilesSetForUserV0Request,
    options?: ApiPostOptions,
): Promise<ApiResult<ActiveProfilesSetForUserV0Response>> {
    return apiPostResult<ActiveProfilesSetForUserV0Response>(
        '/api/activeProfiles/setForUser/v0',
        body,
        options,
    );
}

// profilesRightsGetListV0 — получение списка всех доступных групп прав и прав
// POST /api/profiles/rights/getList/v0
export async function profilesRightsGetListV0(
    options?: ApiPostOptions,
): Promise<ApiResult<ProfilesRightsGetListV0Response>> {
    return apiPostResult<ProfilesRightsGetListV0Response>(
        '/api/profiles/rights/getList/v0',
        {},
        options,
    );
}

// profilesRightsSetV0 — установка прав для пользователя в профиле
// POST /api/profiles/rights/set/v0
export async function profilesRightsSetV0(
    body: ProfilesRightsSetV0Request,
    options?: ApiPostOptions,
): Promise<ApiResult<ProfilesRightsSetV0Response>> {
    return apiPostResult<ProfilesRightsSetV0Response>(
        '/api/profiles/rights/set/v0',
        body,
        options,
    );
}

// profilesRightsGetV0 — получение прав всех пользователей в профиле
// POST /api/profiles/rights/get/v0
export async function profilesRightsGetV0(
    body: ProfilesRightsGetV0Request,
    options?: ApiPostOptions,
): Promise<ApiResult<ProfilesRightsGetV0Response>> {
    return apiPostResult<ProfilesRightsGetV0Response>(
        '/api/profiles/rights/get/v0',
        body,
        options,
    );
}

// profileSearchV0 — поиск профилей по никнейму или фрагменту номера телефона
// POST /api/profile/search/v0
export async function profileSearchV0(
    body: ProfileSearchV0Request,
    options?: ApiPostOptions,
): Promise<ApiResult<ProfileSearchV0Response>> {
    return apiPostResult<ProfileSearchV0Response>(
        '/api/profile/search/v0',
        body,
        options,
    );
}
