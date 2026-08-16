
import type {
    ContainerAddFileV0Response,
    ContainerAddFileV0Request,
    ContainerAddFileV0Result,
    ContainerCreateV0Result,
    ContainerCreateV0Request,
    ContainerCreateV0Response,
} from '@/services/public-api-union/common-functions_file_storage';
export type {
    ContainerAddFileV0Request as ContainerAddFileRequest,
    ContainerAddFileV0Response as ContainerAddFileResponse,
    ContainerAddFileV0Result as ContainerAddFileResult,
    ContainerCreateV0Request as ContainerCreateRequest,
    ContainerCreateV0Response as ContainerCreateResponse,
    ContainerCreateV0Result as ContainerCreateResult,
};

export const createContainerUrl = '/api/fileStorage/container/create/v0';
export const addFileUrl = '/api/fileStorage/container/addFile/v0';
