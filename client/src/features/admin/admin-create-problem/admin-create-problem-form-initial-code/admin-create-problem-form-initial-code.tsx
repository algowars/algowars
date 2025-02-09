import { CodeEditor } from "@/components/code-editor/code-editor";
import { ControllerRenderProps } from "react-hook-form";
import { createProblemRenderProps } from "../../api/create-problem";

type AdminCreateProblemFormInitialCodeProps = {
  field: ControllerRenderProps<createProblemRenderProps, "initialCode">;
};

export const AdminCreateProblemFormInitialCode = ({
  field,
}: AdminCreateProblemFormInitialCodeProps) => {
  const changeCode = (value: string) => {
    field.onChange(value);
  };

  return <CodeEditor code={field.value} changeCode={changeCode} />;
};
