import { useSocket } from "@/context/socketProvider";
import { ErrorModel } from "@/models/ErrorModel";
import { SubmissionStatusDescription } from "@/models/SubmissionStatusDescription";
import { SubmissionStatusModel } from "@/models/SubmissionStatusModel";
import { evaluatorService } from "@/services/EvaluatorService";
import { submissionService } from "@/services/SubmissionService";
import { useState } from "react";

export const useProblemPage = () => {
  const [code, setCode] = useState<string>(`/**
  * @param {number} n
  * @return {string[]}
  */
  var fizzBuzz = function(n) {
      
  };`);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorModel | null>(null);
  const [submissionResult, setSubmissionResult] = useState<any | null>(null); // Adjust according to the actual result model
  const changeCode = (value: string | undefined) => {
    setCode(value ?? "");
  };

  const submitCode = async () => {
    setIsLoading(true);
    setError(null);
    const [data, apiError] = await evaluatorService.createAnonymousSubmission(
      code
    );

    if (data && data.token) {
      pollSubmissionStatus(data.token);
    }

    if (apiError) {
      setError(apiError);
    }

    setIsLoading(false);
  };

  const pollSubmissionStatus = async (id: string) => {
    const interval = 2000;

    const checkStatus = async () => {
      const [submission, statusError] = await submissionService.getSubmission(
        id
      );

      if (submission) {
        if (
          submission?.status.description ===
            SubmissionStatusDescription.IN_QUEUE ||
          submission?.status.description ===
            SubmissionStatusDescription.PROCESSING
        ) {
          setTimeout(checkStatus, interval);
        } else {
          if (statusError) {
            setError(statusError);
          }
          setSubmissionResult(submission);
        }
      }
    };

    checkStatus();
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
