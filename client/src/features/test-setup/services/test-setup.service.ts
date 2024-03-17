import api from "@/api/api";
import { PaginationResponse } from "@/common/pagination/pagination-response.model";
import { AxiosRequestConfig } from "axios";
import { TestSetup } from "../test-setup.model";

const getPageable = (
  accessToken: string,
  page: number,
  size: number,
  timestamp: Date
): Promise<PaginationResponse<TestSetup>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/test-setup",
    params: {
      page,
      size,
      timestamp: timestamp.toISOString(),
    },
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api.callExternalApi<PaginationResponse<TestSetup>>({ config });
};

const testSetupService = {
  getPageable,
};

Object.freeze(testSetupService);

export { testSetupService };
