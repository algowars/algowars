import "@mdxeditor/editor/style.css";
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  thematicBreakPlugin,
} from "@mdxeditor/editor";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProblemEditorQuestionTabs } from "./ProblemEditorQuestionTabs";
import Markdown from "@/components/markdown/Markdown";

type Props = {
  question: string;
  changeQuestion: (v: string) => void;
};

const ProblemEditorQuestion = ({ question, changeQuestion }: Props) => {
  return (
    <div className="flex flex-col gap-3">
      <Tabs defaultValue={ProblemEditorQuestionTabs.DESCRIPTION}>
        <TabsList className="grid w-64 grid-cols-2">
          <TabsTrigger value={ProblemEditorQuestionTabs.DESCRIPTION}>
            {ProblemEditorQuestionTabs.DESCRIPTION}
          </TabsTrigger>
          <TabsTrigger value={ProblemEditorQuestionTabs.PREVIEW}>
            {ProblemEditorQuestionTabs.PREVIEW}
          </TabsTrigger>
        </TabsList>
        <TabsContent value={ProblemEditorQuestionTabs.DESCRIPTION}>
          <MDXEditor
            markdown={question}
            plugins={[
              headingsPlugin(),
              listsPlugin(),
              quotePlugin(),
              thematicBreakPlugin(),
              markdownShortcutPlugin(),
            ]}
            onChange={changeQuestion}
            className="border rounded h-96"
          />
        </TabsContent>
        <TabsContent value={ProblemEditorQuestionTabs.PREVIEW}>
          <Markdown content={question} className="border rounded p-3 h-96" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProblemEditorQuestion;
