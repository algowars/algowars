import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useProblemEditor } from "./ProblemEditor.hooks";
import ProblemCodeEditor from "../problem-code-editor/ProblemCodeEditor";
import ProblemEditorMetadata from "./problem-editor-metadata/ProblemEditorMetadata";
import ProblemEditorQuestion from "./problem-editor-question/ProblemEditorQuestion";

const ProblemEditor = () => {
  const {
    title,
    changeTitle,
    slug,
    changeSlug,
    tests,
    setTests,
    question,
    changeQuestion,
  } = useProblemEditor();
  return (
    <Card className="grid grid-cols-2 gap-7 p-5">
      <section className="flex flex-col gap-5">
        <h4 className="text-xl font-semibold">Metadata</h4>
        <ProblemEditorMetadata
          title={title}
          changeTitle={changeTitle}
          slug={slug}
          changeSlug={changeSlug}
        />
      </section>
      <section className="flex flex-col gap-5">
        <h4 className="text-xl font-semibold">Questions</h4>
        <ProblemEditorQuestion
          question={question}
          changeQuestion={changeQuestion}
        />
      </section>
      <section className="flex flex-col gap-5">
        <h4 className="text-xl font-semibold">Solution</h4>
      </section>
      <section className="flex flex-col gap-5">
        <h4 className="text-xl font-semibold">Tests</h4>
      </section>
      {/* <div className="flex flex-col gap-3">
        <h4 className="text-xl font-semibold">Metadata</h4>
        <div className="flex flex-col gap-3">
          <label htmlFor="title">Problem Title</label>
          <Input
            value={title}
            onChange={(e) => changeTitle(e.target.value)}
            placeholder="Title..."
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="title">Problem URL Slug</label>
          <Input
            value={slug}
            onChange={(e) => changeSlug(e.target.value)}
            placeholder="Slug..."
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h4 className="text-lg font-semibold">Initial Code</h4>
        <div className="h-[20rem]">
          <ProblemCodeEditor initialCode="TEST" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h4 className="text-lg font-semibold">Solution</h4>
        <div className="h-[20rem]">
          <ProblemCodeEditor initialCode="TEST" />
        </div>
      </div> */}
    </Card>
  );
};

export default ProblemEditor;