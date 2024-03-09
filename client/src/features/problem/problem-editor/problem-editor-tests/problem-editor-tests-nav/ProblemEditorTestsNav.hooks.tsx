import { ProblemTestModel } from "@/models/problem/ProblemTestModel";
import { Dispatch, SetStateAction } from "react";

export const useProblemEditorTestsNav = (
  setTests: Dispatch<SetStateAction<ProblemTestModel[]>>,
  changeCurrentTestIndex: (value: number) => void,
  currentTestIndex: number
) => {
  const addTest = () => {
    setTests((curr) => [
      ...curr,
      {
        test: `describe('TEST', () => {
  it("Should test", () => {
    assert.equal();
  });
});`,
      },
    ]);
  };

  const changeTest = (index: number) => {
    changeCurrentTestIndex(index);
  };

  const removeTest = (index: number) => {
    setTests((currTests) => {
      const updatedTests = [
        ...currTests.slice(0, index),
        ...currTests.slice(index + 1),
      ];

      changeCurrentTestIndex(Math.max(0, currentTestIndex - 1));

      return updatedTests;
    });
  };

  return { addTest, changeTest, removeTest };
};
