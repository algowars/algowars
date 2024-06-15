import { createContext, useContext, useState } from "react";

type ProblemEditorProviderProps = {
  children: React.ReactNode;
};

export type ProblemEditorProviderState = {
  currentTestIndex: number;
  changeCurrentTestIndex: (val: number) => void;
};

const initialState: ProblemEditorProviderState = {
  currentTestIndex: 0,
  changeCurrentTestIndex: () => null,
};

const ProblemEditorProviderContext =
  createContext<ProblemEditorProviderState>(initialState);

export function ProblemEditorProvider({
  children,
  ...props
}: ProblemEditorProviderProps) {
  const [currentTestIndex, setCurrentTestIndex] = useState<number>(0);

  const changeCurrentTestIndex = (newIndex: number) => {
    setCurrentTestIndex(newIndex);
  };

  const value = {
    currentTestIndex,
    changeCurrentTestIndex,
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
