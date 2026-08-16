import {
    apiPostResult,
    type ApiPostOptions,
    type ApiResult,
} from '@/services/api/apiPostResult';

export class ApiRequestError extends Error {
    result: ApiResult<unknown>;

    constructor(result: ApiResult<unknown>, message?: string) {
        super(message ?? 'API request failed');
        this.name = 'ApiRequestError';
        this.result = result;
    }
}

export async function apiPostOrFail<T, B extends object = object>(
    url: string,
    body: B,
    options?: ApiPostOptions,
): Promise<T> {
    const result = await apiPostResult<T>(url, body, options);

    if (result.has_tech_problem) {
        throw result.techError;
    }

    if (result.backErr) {
        throw new ApiRequestError(result, result.backErr.infoText);
    }

    if (!result.ok) {
        throw new ApiRequestError(result, 'Request failed');
    }

    return result.value as T;
}

export function composeFileUrl(
    fileId: string,
    keyHash: string,
    comphash: string,
) {
    const url =
        'https://les.myfantasy.ru/api/fileStorage/file/downloadByUniqueKey/v0?';

    const queryParams = {
        file_id: fileId,
        unique_key_hash: keyHash,
        comphash,
    };

    const params = new URLSearchParams(queryParams).toString();

    return `${url}${params}`;
}
