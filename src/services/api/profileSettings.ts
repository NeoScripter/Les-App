import { apiPostResult, type ApiPostOptions, type ApiResult } from "./apiPostResult";

export type UpdateItem = {
    relationship_state: string;
    permission: string;
    new_value: boolean;
    save_if_default: boolean;
};

export type ProfileSettingsTableUpdateV0Request = {
    profile_id: string;
    items: UpdateItem[];
};

export type ProfileSettingsTableUpdateV0Response = {
    ok: boolean;
    reason: string;
};

export type ProfileSettingsTableGetV0Request = {
    profile_id: string;
};

export type TableCell = {
    relationship_state: string;
    permission: string;
    value: boolean;
    is_default: boolean;
    default: boolean;
    allowed_to_edit: boolean;
};

export type ProfileSettingsTableGetV0Response = {
    profile_id: string;
    cells: TableCell[];
    relationship_states: string[];
    permissions: string[];
};

export type ProfileSettingsTableGetPartV0Request = {
    profile_id: string;
    relationship_states: string[];
    permissions: string[];
};

export type ProfileSettingsTableGetPartV0Response = {
    profile_id: string;
    cells: TableCell[];
    relationship_states: string[];
    permissions: string[];
};

export async function profileSettingsTableUpdateV0(
    body: ProfileSettingsTableUpdateV0Request,
    options?: ApiPostOptions
): Promise<ApiResult<ProfileSettingsTableUpdateV0Response>> {
    return apiPostResult<ProfileSettingsTableUpdateV0Response>('/api/profileSettings/table/update/v0', body, options);
}

export async function profileSettingsTableGetV0(
    body: ProfileSettingsTableGetV0Request,
    options?: ApiPostOptions
): Promise<ApiResult<ProfileSettingsTableGetV0Response>> {
    return apiPostResult<ProfileSettingsTableGetV0Response>('/api/profileSettings/table/get/v0', body, options);
}

export async function profileSettingsTableGetPartV0(
    body: ProfileSettingsTableGetPartV0Request,
    options?: ApiPostOptions
): Promise<ApiResult<ProfileSettingsTableGetPartV0Response>> {
    return apiPostResult<ProfileSettingsTableGetPartV0Response>('/api/profileSettings/table/getPart/v0', body, options);
}
