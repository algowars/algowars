import { SubmissionResult } from "@/features/submission-result/models/submission-result.model";
import { createContext, useContext, useState } from "react";

type ProblemEditorProviderProps = {
  children: React.ReactNode;
  runExecutable: () => void;
  sourceCode: string;
  changeSourceCode: (val: string) => void;
  submissionResult: SubmissionResult | null;
  pollingId: string;
};

export type ProblemEditorProviderState = {
  currentTestIndex: number;
  changeCurrentTestIndex: (val: number) => void;
  runExecutable: () => void;
  sourceCode: string;
  changeSourceCode: (val: string) => void;
  submissionResult: SubmissionResult | null;
  pollingId: string;
};

const initialState: ProblemEditorProviderState = {
  currentTestIndex: 0,
  changeCurrentTestIndex: () => null,
  runExecutable: () => null,
  sourceCode: "",
  changeSourceCode: () => null,
  submissionResult: null,
  pollingId: "",
};

const ProblemEditorProviderContext =
  createContext<ProblemEditorProviderState>(initialState);

export function ProblemEditorProvider({
  children,
  runExecutable,
  sourceCode,
  changeSourceCode,
  submissionResult,
  pollingId,
  ...props
}: ProblemEditorProviderProps) {
  const [currentTestIndex, setCurrentTestIndex] = useState<number>(0);

  const changeCurrentTestIndex = (newIndex: number) => {
    setCurrentTestIndex(newIndex);
  };

  const value = {
    currentTestIndex,
    changeCurrentTestIndex,
    runExecutable,
    sourceCode,
    changeSourceCode,
    submissionResult,
    pollingId,
  };

  return (
    <ProblemEditorProviderContext.Provider {...props} value={value}>
      {children}
    </ProblemEditorProviderContext.Provider>
  );
}

export const useProblemEditor = () => {
  const context = useContext(ProblemEditorProviderContext);

  if (context === undefined)
    throw new Error(
      "useProblemEditor must be used within ProblemEditorProvider"
    );

  return context;
};
