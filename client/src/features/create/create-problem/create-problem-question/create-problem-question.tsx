import "@mdxeditor/editor/style.css";
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CodeToggle,
  InsertCodeBlock,
  InsertTable,
  InsertThematicBreak,
  MDXEditor,
  UndoRedo,
  codeBlockPlugin,
  codeMirrorPlugin,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";
import { useCreateProblem } from "../create-problem.provider";
import { useState } from "react";
import MarkdownViewer from "@/components/markdown-viewer/markdown-viewer";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const CreateProblemQuestion = () => {
  const { createProblem, changeCreateProblem } = useCreateProblem();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-3">
      {isEditing ? (
        <MDXEditor
          className="border rounded-md text-sm"
          placeholder="Question"
          markdown={createProblem.question}
          plugins={[
            headingsPlugin(),
            listsPlugin(),
            quotePlugin(),
            thematicBreakPlugin(),
            markdownShortcutPlugin(),
            codeBlockPlugin(),
            codeMirrorPlugin(),
            tablePlugin(),
            thematicBreakPlugin(),
            toolbarPlugin({
              toolbarContents: () => (
                <>
                  <BlockTypeSelect />
                  <BoldItalicUnderlineToggles />
                  <CodeToggle />
                  <InsertTable />
                  <InsertThematicBreak />
                </>
              ),
            }),
          ]}
          onChange={(value) => changeCreateProblem("question", value)}
        />
      ) : (
        <div className="border rounded-md p-5 text-md">
          <MarkdownViewer markdown={createProblem.question} />
        </div>
      )}
      <div className="flex items-center space-x-2 ml-auto">
        <Label>Preview Question</Label>
        <Switch
          checked={!isEditing}
          onCheckedChange={() => setIsEditing((curr) => !curr)}
        />
      </div>
    </div>
  );
};

export default CreateProblemQuestion;
