import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { CreateProblemDto } from "./dtos/create-problem.dto";

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
};

const initialState: CreateProblemState = {
  createProblem: {
    title: "",
    slug: "",
    question: "",
  },
  setCreateProblem: () => null,
  changeCreateProblem: () => null,
};

const CreateProblemProviderContext =
  createContext<CreateProblemState>(initialState);

export function CreateProblemProvider({
  children,
  ...props
}: CreateProblemProps) {
  const [createProblem, setCreateProblem] = useState<CreateProblemDto>({
    title: "",
    slug: "",
    question: "",
  });

  const changeCreateProblem: CreateProblemState["changeCreateProblem"] = (
    key,
    value
  ) => {
    setCreateProblem((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const value = {
    createProblem,
    setCreateProblem,
    changeCreateProblem,
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
