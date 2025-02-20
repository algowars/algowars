import { useState } from "react";
import { Test } from "../../models/test";
import { ProblemEditorTestCodeCard } from "./problem-editor-tests-code";
import { ProblemEditorTestsInput } from "./problem-editor-tests-input";
import { TestType } from "../../models/test-type";
import { Button } from "@/components/ui/button";

type ProblemEditorTestsTabProps = {
  tests: Test[];
};

export const ProblemEditorTestsTab = ({
  tests,
}: ProblemEditorTestsTabProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const currentTest = tests[activeTab];

  return (
    <div>
      <nav className="px-2 py-1 flex items-center gap-1">
        {tests.map((test, index) => (
          <Button
            variant="ghost"
            className={`h-7 px-3 py-1 ${
              index === activeTab ? "text-primary" : "text-muted-foreground"
            }`}
            key={test.id}
            onClick={() => handleTabClick(index)}
          >
            {`Test ${index + 1}`}
          </Button>
        ))}
      </nav>
      <div className="editor-content">
        {currentTest.testType === TestType.UVU ? (
          <ProblemEditorTestCodeCard key={currentTest.id} test={currentTest} />
        ) : (
          <ProblemEditorTestsInput key={currentTest.id} test={currentTest} />
        )}
      </div>
    </div>
  );
};
