import { ErrorModel } from "@/models/ErrorModel";
import { evaluatorService } from "@/services/EvaluatorService";
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

  const changeCode = (value: string | undefined) => {
    setCode(value ?? "");
  };

  const submitCode = async () => {
    setIsLoading(true);
    setError(null);
    const [data, apiError] = await evaluatorService.createAnonymousSubmission(
      code
    );

    if (apiError) {
      setError(apiError);
    }

    console.log(data, apiError);
    setIsLoading(false);
  };

  return { code, changeCode, isLoading, error, submitCode };
};
