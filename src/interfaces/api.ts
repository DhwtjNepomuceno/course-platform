export interface ApiResponseData<t> {
    data: t;
    successed: boolean;
    message: string;
    status: number;
}

export interface ApiResponseError {
    successed: boolean;
    error: string;
    status: number;
}