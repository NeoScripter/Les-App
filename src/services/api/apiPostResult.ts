let apiHost = '';

export function setApiHost(host: string): void {
    apiHost = host;
}

export class ApiError extends Error {
    code: string;
    infoText: string;
    info: unknown;
    httpStatus: number;

    constructor(
        message: string,
        code: string,
        infoText?: string,
        info?: unknown,
        httpStatus?: number,
    ) {
        super(message);
        this.name = 'ApiError';
        this.code = code;
        this.infoText = infoText ?? '';
        this.info = info ?? null;
        this.httpStatus = httpStatus ?? 0;
    }
}

export interface ApiResult<T> {
    ok: boolean;
    has_warn: boolean;
    has_tech_problem: boolean;
    warn: ApiError | null;
    techError: Error | null;
    backErr: ApiError | null;
    value: T | null;
}

export interface ApiPostOptions {
    signal?: AbortSignal;
    timeoutMs?: number;
    keepalive?: boolean;
}

export async function apiPostResult<T>(
    url: string,
    body: object,
    {
        signal: externalSignal,
        timeoutMs = 30000,
        keepalive = false,
    }: ApiPostOptions = {},
): Promise<ApiResult<T>> {
    const result: ApiResult<T> = {
        ok: false,
        has_warn: false,
        has_tech_problem: false,
        warn: null,
        techError: null,
        backErr: null,
        value: null,
    };

    const useSignal = !keepalive;

    const timeoutController =
        useSignal && timeoutMs > 0 ? new AbortController() : null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    if (timeoutController) {
        timeoutId = setTimeout(() => timeoutController.abort(), timeoutMs);
    }

    let signal: AbortSignal | undefined;
    if (useSignal) {
        if (externalSignal && timeoutController) {
            signal = AbortSignal.any([
                externalSignal,
                timeoutController.signal,
            ]);
        } else if (externalSignal) {
            signal = externalSignal;
        } else if (timeoutController) {
            signal = timeoutController.signal;
        } else {
            signal = undefined;
        }
    } else {
        signal = undefined;
    }

    try {
        const fetchOptions: RequestInit = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(body),
        };
        if (signal) {
            fetchOptions.signal = signal;
        }
        if (keepalive) {
            fetchOptions.keepalive = true;
        }
        const response = await fetch(apiHost + url, fetchOptions);

        let data: any;
        try {
            data = await response.json();
        } catch (parseError) {
            result.has_tech_problem = true;
            result.techError = new Error(
                `JSON parse error: ${parseError instanceof Error ? parseError.message : String(parseError)}`,
            );
            return result;
        }

        if (!response.ok) {
            result.backErr = new ApiError(
                data.message ?? 'Unknown server error',
                data.messageCode ?? 'UNKNOWN',
                data.infoText,
                data.info,
                response.status,
            );
            return result;
        }

        result.ok = true;
        if (data.warning !== undefined) {
            result.has_warn = true;
            result.warn = new ApiError(
                typeof data.warning === 'string'
                    ? data.warning
                    : JSON.stringify(data.warning),
                'WARNING',
                '',
                null,
            );
            delete data.warning;
        }
        result.value = data as T;
    } catch (networkError) {
        result.has_tech_problem = true;
        if (
            networkError instanceof Error &&
            networkError.name === 'AbortError' &&
            timeoutController?.signal.aborted
        ) {
            result.techError = new Error(`Request timeout (${timeoutMs} ms)`);
        } else {
            result.techError =
                networkError instanceof Error
                    ? networkError
                    : new Error(String(networkError));
        }
    } finally {
        if (timeoutId) clearTimeout(timeoutId);
    }

    return result;
}
