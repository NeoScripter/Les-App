export const AllowedContentType = {
    ANY: '',
    JPEG: 'image/jpeg',
} as const;

export type AllowedContentType =
    (typeof AllowedContentType)[keyof typeof AllowedContentType];

export const AllowedContentTypeDescriptions: Record<
    AllowedContentType,
    string
> = {
    [AllowedContentType.ANY]: 'Любой тип файлов (без ограничений)',
    [AllowedContentType.JPEG]:
        'Изображения JPEG (.jpg, .jpeg) с проверкой размеров',
};
