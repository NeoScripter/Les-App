import {
    apiPostResult,
    type ApiPostOptions,
    type ApiResult,
} from './apiPostResult';


export type YaRequestSendV0Request = {};

export type YaRequestSendV0Response = {
    redirect_url: string;
};

export type YaRequestReciveV0Request = {
    code: string;
};

export type YaRequestReciveV0Response = {
    ok: boolean;
};

export type VkRequestSendV0Request = {};

export type VkRequestSendV0Response = {
    redirect_url: string;
};

export type VkRequestReciveV0Request = {
    code: string;
    state: string;
    device_id: string;
};

export type VkRequestReciveV0Response = {
    ok: boolean;
};

export type TestRequestReciveV0Request = {};

export type TestRequestReciveV0Response = {
    token: string;
    ok: boolean;
};

export type LogoutRequest = {};

export type LogoutResponse = {};

export type CurrentStateRequest = {};

export type UserInfo = {
    user_id: string;
    provider: string;
    email: string;
    phone: string;
};

export type CurrentStateResponse = {
    users_info: UserInfo[];
    is_login: boolean;
};

export async function yaRequestSendV0(
    options?: ApiPostOptions
): Promise<ApiResult<YaRequestSendV0Response>> {
    return apiPostResult<YaRequestSendV0Response>('/api/auth/yaRequestSend/v0', {}, options);
}

export async function yaRequestReciveV0(
    body: YaRequestReciveV0Request,
    options?: ApiPostOptions
): Promise<ApiResult<YaRequestReciveV0Response>> {
    return apiPostResult<YaRequestReciveV0Response>('/api/auth/yaRequestRecive/v0', body, options);
}

export async function vkRequestSendV0(
    options?: ApiPostOptions
): Promise<ApiResult<VkRequestSendV0Response>> {
    return apiPostResult<VkRequestSendV0Response>('/api/auth/vkRequestSend/v0', {}, options);
}

export async function vkRequestReciveV0(
    body: VkRequestReciveV0Request,
    options?: ApiPostOptions
): Promise<ApiResult<VkRequestReciveV0Response>> {
    return apiPostResult<VkRequestReciveV0Response>('/api/auth/vkRequestRecive/v0', body, options);
}

export async function testRequestReciveV0(
    options?: ApiPostOptions
): Promise<ApiResult<TestRequestReciveV0Response>> {
    return apiPostResult<TestRequestReciveV0Response>('/api/auth/testRequestRecive/v0', {}, options);
}

export async function logout(
    options?: ApiPostOptions
): Promise<ApiResult<LogoutResponse>> {
    return apiPostResult<LogoutResponse>('/api/auth/logout', {}, options);
}

export async function currentState(
    options?: ApiPostOptions
): Promise<ApiResult<CurrentStateResponse>> {
    return apiPostResult<CurrentStateResponse>('/api/auth/currentState', {}, options);
}
