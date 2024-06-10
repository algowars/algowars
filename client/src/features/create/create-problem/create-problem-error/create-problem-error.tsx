import { toast } from "sonner";
import { useCreateProblem } from "../create-problem.provider";
import { useEffect } from "react";

const CreateProblemError = () => {
  const { error } = useCreateProblem();

  useEffect(() => {
    if (error?.message) {
      toast.error("Error creating problem", {
        description: error.message,
      });
    }
  }, [error?.message]);
  return null;
};

export default CreateProblemError;
