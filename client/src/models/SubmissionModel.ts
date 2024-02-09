import { SubmissionStatusModel } from "./SubmissionStatusModel";

export interface SubmissionModel {
  stdout: null;
  time: null;
  memory: null;
  stderr: null;
  token: string;
  compile_outpu: null;
  message: null;
  status: SubmissionStatusModel;
}
