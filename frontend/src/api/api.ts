export interface Response<T> {
    success: boolean;
    data: T;
    total: number,
    error: string;
}