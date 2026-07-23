import {
    apiPostResult,
    type ApiPostOptions,
    type ApiResult,
} from './apiPostResult';

export type ContainerCreateV0Request = {
    max_file_count: number;
    allowed_content_type: string;
};

export type ContainerCreateV0Response = {
    container_id: string;
};

export type ContainerAddFileV0Request = {
    container_id: string;
    file_content: string;
    file_name: string;
    meta: string;
    description: string;
};

export type ContainerAddFileV0Response = {
    file_id: string;
};

export type ContainerGetFileListV0Request = {
    container_id: string;
};

export type FileInfo = {
    file_id: string;
    file_name: string;
    meta: string;
    description: string;
    created_at: string;
};

export type ContainerGetFileListV0Response = {
    files: FileInfo[];
};

export type ContainerGetFileV0Request = {
    container_id: string;
    file_id: string;
};

export type ContainerGetFileV0Response = {
    file_id: string;
    container_id: string;
    file_content: string;
    file_name: string;
    meta: string;
    description: string;
    created_at: string;
};

export type ContainerDeleteFileV0Request = {
    container_id: string;
    file_id: string;
};

export type ContainerDeleteFileV0Response = {
    ok: boolean;
};

export type FileGetContentByUniqueKeyV0Request = {
    file_id: string;
    unique_key_hash: string;
    comphash: string;
};

export type FileGetContentByUniqueKeyV0Response = {
    file_id: string;
    container_id: string;
    file_content: string;
    file_name: string;
    meta: string;
    description: string;
    created_at: string;
};

export type ContainerGetInfoV0Request = {
    container_id: string;
};

export type ContainerGetInfoV0Response = {
    container_id: string;
    is_processed: boolean;
    max_file_count: number;
    allowed_content_type: string;
    processed_at: string;
    expires_at: string;
    created_at: string;
};

export type AllowedContentTypeGetListV0Request = {};

export type AllowedContentTypeItem = {
    content_type: string;
    description: string;
};

export type AllowedContentTypeGetListV0Response = {
    items: AllowedContentTypeItem[];
};

export async function containerCreateV0(
    body: ContainerCreateV0Request,
    options?: ApiPostOptions,
): Promise<ApiResult<ContainerCreateV0Response>> {
    return apiPostResult<ContainerCreateV0Response>(
        '/api/fileStorage/container/create/v0',
        body,
        options,
    );
}

export async function containerAddFileV0(
    body: ContainerAddFileV0Request,
    options?: ApiPostOptions,
): Promise<ApiResult<ContainerAddFileV0Response>> {
    return apiPostResult<ContainerAddFileV0Response>(
        '/api/fileStorage/container/addFile/v0',
        body,
        options,
    );
}

export async function containerGetFileListV0(
    body: ContainerGetFileListV0Request,
    options?: ApiPostOptions,
): Promise<ApiResult<ContainerGetFileListV0Response>> {
    return apiPostResult<ContainerGetFileListV0Response>(
        '/api/fileStorage/container/getFileList/v0',
        body,
        options,
    );
}

export async function containerGetFileV0(
    body: ContainerGetFileV0Request,
    options?: ApiPostOptions,
): Promise<ApiResult<ContainerGetFileV0Response>> {
    return apiPostResult<ContainerGetFileV0Response>(
        '/api/fileStorage/container/getFile/v0',
        body,
        options,
    );
}

export async function containerDeleteFileV0(
    body: ContainerDeleteFileV0Request,
    options?: ApiPostOptions,
): Promise<ApiResult<ContainerDeleteFileV0Response>> {
    return apiPostResult<ContainerDeleteFileV0Response>(
        '/api/fileStorage/container/deleteFile/v0',
        body,
        options,
    );
}

export async function fileGetContentByUniqueKeyV0(
    body: FileGetContentByUniqueKeyV0Request,
    options?: ApiPostOptions,
): Promise<ApiResult<FileGetContentByUniqueKeyV0Response>> {
    return apiPostResult<FileGetContentByUniqueKeyV0Response>(
        '/api/fileStorage/file/getContentByUniqueKey/v0',
        body,
        options,
    );
}

export async function containerGetInfoV0(
    body: ContainerGetInfoV0Request,
    options?: ApiPostOptions,
): Promise<ApiResult<ContainerGetInfoV0Response>> {
    return apiPostResult<ContainerGetInfoV0Response>(
        '/api/fileStorage/container/getInfo/v0',
        body,
        options,
    );
}

export async function allowedContentTypeGetListV0(
    options?: ApiPostOptions,
): Promise<ApiResult<AllowedContentTypeGetListV0Response>> {
    return apiPostResult<AllowedContentTypeGetListV0Response>(
        '/api/fileStorage/allowedContentType/getList/v0',
        {},
        options,
    );
}
