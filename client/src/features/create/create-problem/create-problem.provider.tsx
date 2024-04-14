import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { CreateProblemDto } from "./dtos/create-problem.dto";
import { CreateProblemTestDto } from "./dtos/create-problem-test.dto";

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
  changeTest: (index: number, value: CreateProblemTestDto) => void;
  addTest: () => void;
  removeTest: (index: number) => void;
};

const initialState: CreateProblemState = {
  createProblem: {
    title: "",
    slug: "",
    question: "",
    solution: "",
    initialCode: `function example(num) {
  // Code goes here
}`,
    testSetup: `process.stdin.on("data", data => {
  const num = parseInt(data.toString().trim(), 10);
  console.log(isEven(num));
});`,
    tests: [],
  },
  setCreateProblem: () => null,
  changeTest: () => null,
  changeCreateProblem: () => null,
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

  const changeCreateProblem: CreateProblemState["changeCreateProblem"] = (
    key,
    value
  ) => {
    console.log(key, value);
    setCreateProblem((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const changeTest = (index: number, value: CreateProblemTestDto) => {
    setCreateProblem((prev) => {
      const updatedTests = [...prev.tests];
      updatedTests[index] = value;

      return {
        ...prev,
        tests: updatedTests,
      };
    });
  };

  const addTest = () => {
    setCreateProblem((curr) => {
      return {
        ...curr,
        tests: [...curr.tests, { inputs: "", expectedOutput: "" }],
      };
    });
  };

  const removeTest = (index: number) => {
    setCreateProblem((curr) => {
      return { ...curr, tests: [...curr.tests.filter((_, i) => i !== index)] };
    });
  };

  const value = {
    createProblem,
    setCreateProblem,
    changeCreateProblem,
    addTest,
    removeTest,
    changeTest,
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
