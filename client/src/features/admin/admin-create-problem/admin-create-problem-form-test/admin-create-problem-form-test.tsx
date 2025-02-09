import { ControllerRenderProps } from "react-hook-form";
import { createProblemRenderProps } from "../../api/create-problem";
import { CodeEditor } from "@/components/code-editor/code-editor";

type AdminCreateProblemFormTest = {
  field: ControllerRenderProps<createProblemRenderProps, "test">;
};

export const AdminCreateProblemFormTest = ({
  field,
}: AdminCreateProblemFormTest) => {
  const changeCode = (value: string) => {
    field.onChange(value);
  };

  return <CodeEditor code={field.value} changeCode={changeCode} />;
};
