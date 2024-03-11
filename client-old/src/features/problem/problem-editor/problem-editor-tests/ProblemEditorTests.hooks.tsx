import { ProblemTestModel } from "@/models/problem/ProblemTestModel";
import { Dispatch, SetStateAction, useState } from "react";

export const useProblemEditorTests = (
  tests: ProblemTestModel[],
  setTests: Dispatch<SetStateAction<ProblemTestModel[]>>
) => {
  const [currentTestIndex, setCurrentTestIndex] = useState<number>(0);

  const changeCurrentTestIndex = (index: number) => {
    if (tests[index]) {
      setCurrentTestIndex(index);
    }
  };

  const changeCurrentTest = (value: string | undefined) => {
    if (value === undefined) return;

    setTests((currTests) => {
      const updatedTests = [...currTests];

      if (currentTestIndex >= 0 && currentTestIndex < updatedTests.length) {
        const currentTest = updatedTests[currentTestIndex];
        updatedTests[currentTestIndex] = { ...currentTest, test: value };
      }

      return updatedTests;
    });
  };

  return { currentTestIndex, changeCurrentTestIndex, changeCurrentTest };
};
