import type { FileBlock } from '@/features/profile/services/api/chats';
import {
    addFileUrl,
    createContainerUrl,
    type ContainerAddFileRequest,
    type ContainerAddFileResponse,
    type ContainerCreateRequest,
    type ContainerCreateResponse,
} from '@/features/profile/services/api/files';
import { apiPostOrFail } from '@/lib/api';

export async function createContainer() {
    const createContainerResult = await apiPostOrFail<
        ContainerCreateResponse,
        ContainerCreateRequest
    >(createContainerUrl, { max_file_count: 0, allowed_content_type: '' });

    return createContainerResult.container_id;
}

const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export async function populateContainer(
    fileList: FileList,
    containerId: string,
    meta = '',
    description = '',
) {
    const files = Array.from(fileList);
    const names = files.map((f) => f.name);

    const requests = files.map(async (file) => {
        const request: ContainerAddFileRequest = {
            container_id: containerId,
            file_name: file.name,
            meta,
            description,
            file_content: await readFileAsDataURL(file),
        };
        return apiPostOrFail<ContainerAddFileResponse, ContainerAddFileRequest>(
            addFileUrl,
            request,
        );
    });

    const responses = await Promise.all(requests);

    return responses.map(
        (response, idx) =>
            ({
                type: 'file',
                file_file_id: response.file_id,
                content_text: names[idx],
                file_spoiler: false,
            }) as FileBlock,
    );
}
