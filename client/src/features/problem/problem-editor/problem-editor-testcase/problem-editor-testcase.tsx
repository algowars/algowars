import { TestCase } from "../../models/test-case";

type ProblemEditorTestCaseProps = {
  testCase: TestCase;
};

export const ProblemEditorTestCase = ({
  testCase,
}: ProblemEditorTestCaseProps) => {
  return (
    <div className="p-4 border rounded mb-2">
      <h5 className="font-semibold">Test Case</h5>
      <p>
        <strong>Input:</strong> {testCase.input}
      </p>
    </div>
  );
};
