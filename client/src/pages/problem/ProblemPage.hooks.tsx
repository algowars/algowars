import { ErrorModel } from "@/models/ErrorModel";
import { SubmissionModel } from "@/models/SubmissionModel";
import { SubmissionStatusDescription } from "@/models/SubmissionStatusDescription";
import { useState } from "react";

export const useProblemPage = () => {
  const [code, setCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorModel | null>(null);
  const [submissionResult, setSubmissionResult] =
    useState<SubmissionModel | null>(null);
  const changeCode = (value: string | undefined) => {
    setCode(value ?? "");
  };

  const submitCode = async () => {
    setIsLoading(true);
    setError(null);
    setSubmissionResult(null);

    // const [data, apiError] = await evaluatorService.createAnonymousSubmission(
    //   code
    // );

    // if (apiError) {
    //   setError(apiError);
    // }

    // if (data && data.token) {
    //   await pollSubmissionStatus(data.token);
    // }

    setIsLoading(false);
  };

  const pollSubmissionStatus = async (id: string) => {
    const interval = 2000;

    const checkStatus = async () => {
      // const [submission, statusError] = await submissionService.getSubmission(
      //   id
      // );
      // if (submission) {
      //   if (
      //     submission?.status.description ===
      //       SubmissionStatusDescription.IN_QUEUE ||
      //     submission?.status.description ===
      //       SubmissionStatusDescription.PROCESSING
      //   ) {
      //     setTimeout(checkStatus, interval);
      //   } else {
      //     if (statusError) {
      //       setError(statusError);
      //     }
      //     setSubmissionResult(submission);
      //   }
      // }
    };

    await checkStatus();
  };

  return {
    code,
    changeCode,
    isLoading,
    error,
    submitCode,
    submissionResult,
  };
};
