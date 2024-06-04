import { PaginationResponse } from "@/common/pagination/pagination-response.model";

const getPageable = (
  page: number,
  size: number,
  timestamp: Date
): Promise<PaginationResponse<Problem>> => {};
