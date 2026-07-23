import {
    apiPostResult,
    type ApiPostOptions,
    type ApiResult,
} from './apiPostResult';

export type NamingInput = {
    long_text_only: boolean;
    first_name: string;
    last_name: string;
    short_description: string;
    long_text: string;
};

export type ProfileRelationshipSubscribeV0Request = {
    profile_id: string;
    target_profile_id: string;
};

export type ProfileRelationshipSubscribeV0Response = {
    ok: boolean;
    reason: string;
};

export type ProfileRelationshipUnsubscribeV0Request = {
    profile_id: string;
    target_profile_id: string;
};

export type ProfileRelationshipUnsubscribeV0Response = {
    ok: boolean;
    reason: string;
};

export type ProfileRelationshipContactAddV0Request = {
    profile_id: string;
    target_profile_id: string;
    naming: NamingInput;
};

export type ProfileRelationshipContactAddV0Response = {
    ok: boolean;
    reason: string;
};

export type ProfileRelationshipContactEditV0Request = {
    profile_id: string;
    target_profile_id: string;
    naming: NamingInput;
};

export type ProfileRelationshipContactEditV0Response = {
    ok: boolean;
    reason: string;
};

export type ProfileRelationshipContactRemoveV0Request = {
    profile_id: string;
    target_profile_id: string;
};

export type ProfileRelationshipContactRemoveV0Response = {
    ok: boolean;
    reason: string;
};

export type ProfileRelationshipBlockV0Request = {
    profile_id: string;
    target_profile_id: string;
};

export type ProfileRelationshipBlockV0Response = {
    ok: boolean;
    reason: string;
};

export type ProfileRelationshipUnblockV0Request = {
    profile_id: string;
    target_profile_id: string;
};

export type ProfileRelationshipUnblockV0Response = {
    ok: boolean;
    reason: string;
};

export async function profileRelationshipSubscribeV0(
    body: ProfileRelationshipSubscribeV0Request,
    options?: ApiPostOptions,
): Promise<ApiResult<ProfileRelationshipSubscribeV0Response>> {
    return apiPostResult<ProfileRelationshipSubscribeV0Response>(
        '/api/profilesRelationship/subscribe/v0',
        body,
        options,
    );
}

export async function profileRelationshipUnsubscribeV0(
    body: ProfileRelationshipUnsubscribeV0Request,
    options?: ApiPostOptions,
): Promise<ApiResult<ProfileRelationshipUnsubscribeV0Response>> {
    return apiPostResult<ProfileRelationshipUnsubscribeV0Response>(
        '/api/profilesRelationship/unsubscribe/v0',
        body,
        options,
    );
}

export async function profileRelationshipContactAddV0(
    body: ProfileRelationshipContactAddV0Request,
    options?: ApiPostOptions,
): Promise<ApiResult<ProfileRelationshipContactAddV0Response>> {
    return apiPostResult<ProfileRelationshipContactAddV0Response>(
        '/api/profilesRelationship/contact/add/v0',
        body,
        options,
    );
}

export async function profileRelationshipContactEditV0(
    body: ProfileRelationshipContactEditV0Request,
    options?: ApiPostOptions,
): Promise<ApiResult<ProfileRelationshipContactEditV0Response>> {
    return apiPostResult<ProfileRelationshipContactEditV0Response>(
        '/api/profilesRelationship/contact/edit/v0',
        body,
        options,
    );
}

export async function profileRelationshipContactRemoveV0(
    body: ProfileRelationshipContactRemoveV0Request,
    options?: ApiPostOptions,
): Promise<ApiResult<ProfileRelationshipContactRemoveV0Response>> {
    return apiPostResult<ProfileRelationshipContactRemoveV0Response>(
        '/api/profilesRelationship/contact/remove/v0',
        body,
        options,
    );
}

export async function profileRelationshipBlockV0(
    body: ProfileRelationshipBlockV0Request,
    options?: ApiPostOptions,
): Promise<ApiResult<ProfileRelationshipBlockV0Response>> {
    return apiPostResult<ProfileRelationshipBlockV0Response>(
        '/api/profilesRelationship/block/v0',
        body,
        options,
    );
}

export async function profileRelationshipUnblockV0(
    body: ProfileRelationshipUnblockV0Request,
    options?: ApiPostOptions,
): Promise<ApiResult<ProfileRelationshipUnblockV0Response>> {
    return apiPostResult<ProfileRelationshipUnblockV0Response>(
        '/api/profilesRelationship/unblock/v0',
        body,
        options,
    );
}
