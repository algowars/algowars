import { SubmissionResult } from "@/features/submission-result/models/submission-result.model";
import { createContext, useContext, useState } from "react";

type ProblemEditorProviderProps = {
  children: React.ReactNode;
  runExecutable: () => void;
  submitExecutable: () => void;
  sourceCode: string;
  changeSourceCode: (val: string) => void;
  submissionResult: SubmissionResult | null;
  pollingId: string;
  isPending: boolean;
};

export type ProblemEditorProviderState = {
  currentTestIndex: number;
  changeCurrentTestIndex: (val: number) => void;
  runExecutable: () => void;
  submitExecutable: () => void;
  sourceCode: string;
  changeSourceCode: (val: string) => void;
  submissionResult: SubmissionResult | null;
  pollingId: string;
  isPending: boolean;
};

const initialState: ProblemEditorProviderState = {
  currentTestIndex: 0,
  changeCurrentTestIndex: () => null,
  runExecutable: () => null,
  submitExecutable: () => null,
  sourceCode: "",
  changeSourceCode: () => null,
  submissionResult: null,
  pollingId: "",
  isPending: false,
};

const ProblemEditorProviderContext =
  createContext<ProblemEditorProviderState>(initialState);

export function ProblemEditorProvider({
  children,
  runExecutable,
  submitExecutable,
  sourceCode,
  changeSourceCode,
  submissionResult,
  pollingId,
  isPending,
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
    submitExecutable,
    sourceCode,
    changeSourceCode,
    submissionResult,
    pollingId,
    isPending,
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
