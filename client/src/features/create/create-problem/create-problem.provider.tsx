import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { CreateProblemDto } from "./dtos/create-problem.dto";
import { CreateTestDto } from "./dtos/create-test.dto";

type CreateProblemProps = {
  children: ReactNode;
};

export type CreateProblemState = {
  createProblem: CreateProblemDto;
  setCreateProblem: Dispatch<SetStateAction<CreateProblemDto>>;
  changeCreateProblem: <K extends keyof CreateProblemDto>(
    key: K,
    value: CreateProblemDto[K]
  ) => void;
  createTests: CreateTestDto[];
  addTest: () => void;
  removeTest: (index: number) => void;
};

const initialState: CreateProblemState = {
  createProblem: {
    title: "",
    slug: "",
    question: "",
    solution: "",
  },
  setCreateProblem: () => null,
  changeCreateProblem: () => null,
  createTests: [],
  addTest: () => null,
  removeTest: () => null,
};

const CreateProblemProviderContext =
  createContext<CreateProblemState>(initialState);

export function CreateProblemProvider({
  children,
  ...props
}: CreateProblemProps) {
  const [createProblem, setCreateProblem] = useState<CreateProblemDto>(
    initialState.createProblem
  );

  const [createTests, setCreateTests] = useState<CreateTestDto[]>([]);

  const changeCreateProblem: CreateProblemState["changeCreateProblem"] = (
    key,
    value
  ) => {
    setCreateProblem((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const addTest = () => {
    setCreateTests((curr) => [
      ...curr,
      { inputs: [], expectedOutput: "", test: "" },
    ]);
  };

  const removeTest = (index: number) => {
    setCreateTests((curr) => curr.filter((_, i) => i !== index));
  };

  const value = {
    createProblem,
    setCreateProblem,
    changeCreateProblem,
    createTests,
    addTest,
    removeTest,
  };

  return (
    <CreateProblemProviderContext.Provider {...props} value={value}>
      {children}
    </CreateProblemProviderContext.Provider>
  );
}

export const useCreateProblem = () => {
  const context = useContext(CreateProblemProviderContext);

  if (context === undefined) {
    throw new Error(
      "useCreateProblem must be used within a CreateProblemProvider"
    );
  }

  return context;
};
