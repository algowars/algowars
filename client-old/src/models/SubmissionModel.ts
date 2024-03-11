import { SubmissionStatusModel } from "./SubmissionStatusModel";

export interface SubmissionModel {
  stdout: string | null;
  time: null;
  memory: null;
  stdin: string | null;
  stderr: string | null;
  token: string;
  compile_outpu: null;
  message: null;
  status: SubmissionStatusModel;
}
