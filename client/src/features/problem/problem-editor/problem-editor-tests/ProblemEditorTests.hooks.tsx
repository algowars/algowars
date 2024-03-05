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
    setTests((curr) => {
      return [...curr];
    });
  };

  return { currentTestIndex, changeCurrentTestIndex, changeCurrentTest };
};
