import { ErrorModel } from "@/models/ErrorModel";
import { AxiosError } from "axios";

const handleRequestResponse = (error: AxiosError<ErrorModel>) => {
  if (error?.response?.data) {
    return { message: error.response?.data.message };
  }
  return error;
};

const ApiErrorHandler = {
  handleRequestResponse,
};

Object.freeze(ApiErrorHandler);
export default ApiErrorHandler;
