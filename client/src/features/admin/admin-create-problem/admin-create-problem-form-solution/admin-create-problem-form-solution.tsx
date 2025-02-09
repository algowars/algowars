import { ControllerRenderProps } from "react-hook-form";
import { createProblemRenderProps } from "../../api/create-problem";
import { CodeEditor } from "@/components/code-editor/code-editor";

type AdminCreateProblemFormSolutionProps = {
  field: ControllerRenderProps<createProblemRenderProps, "solution">;
};

export const AdminCreateProblemFormSolution = ({
  field,
}: AdminCreateProblemFormSolutionProps) => {
  const changeCode = (value: string) => {
    field.onChange(value);
  };

  return <CodeEditor code={field.value} changeCode={changeCode} />;
};
