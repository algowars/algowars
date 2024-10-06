import {
  listsPlugin,
  MDXEditor,
  quotePlugin,
  thematicBreakPlugin,
} from "@mdxeditor/editor";
import { headingsPlugin } from "@mdxeditor/editor";
import { ControllerRenderProps } from "react-hook-form";

type AdminCreateProblemFormTextEditorProps = {
  field: ControllerRenderProps<
    { title: string; question: string; slug: string },
    "question"
  >;
};

export const AdminCreateProblemFormTextEditor = ({
  field,
}: AdminCreateProblemFormTextEditorProps) => {
  return (
    <MDXEditor
      markdown={field.value}
      {...field}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
      ]}
      className="border rounded py-1 px-3"
    />
  );
};
