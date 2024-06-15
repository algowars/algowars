import { Card } from "@/components/ui/card";
import { Test } from "../../models/test.model";
import ProblemEditorTestcasesNav from "./problem-editor-testcases-nav/problem-editor-testcases-nav";
import { useProblemEditor } from "../problem-editor.provider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import TypographyH4 from "@/components/ui/typography/typography-h4";

type Props = {
  tests: Test[];
};

const ProblemEditorTestcases = ({ tests }: Props) => {
  const { currentTestIndex } = useProblemEditor();

  const currentTest = tests[currentTestIndex] ?? null;
  return (
    <Card className="h-full">
      <ProblemEditorTestcasesNav tests={tests} />
      {currentTest ? (
        <div className="p-5 flex flex-col gap-5">
          <TypographyH4>Test Inputs</TypographyH4>
          <ul className="">
            {currentTest.inputs.map((input) => (
              <li key={input.label} className="flex flex-col gap-3">
                <Label htmlFor={input.label}>{input.label}</Label>
                <Input id={input.label} value={input.input} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Card>
  );
};

export default ProblemEditorTestcases;
