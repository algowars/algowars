import { ErrorModel } from "./ErrorModel";

export type ApiResponse<T> = [T | null, ErrorModel | null];
