import { CreateProblemDto } from "@/features/problem/dtos/create-problem.dto";
import { ProblemService } from "@/features/problem/services/problem.service";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type CreateProblemProviderProps = {
  children: React.ReactNode;
};

export type CreateProblemProviderState = {
  createProblem: CreateProblemDto;
  setCreateProblem: Dispatch<SetStateAction<CreateProblemDto>>;
  changeCreateProblem: <K extends keyof CreateProblemDto>(
    key: K,
    value: CreateProblemDto[K]
  ) => void;
  submitProblem: () => void;
  isProblemSubmitLoading: boolean;
  error: { message: string } | null;
};

const initialState: CreateProblemProviderState = {
  createProblem: {
    title: "",
    slug: "",
    question: "",
    solution: "",
    rating: 0,
    initialCode: `function example(num) {
  // Code goes here
}`,
    testSetup: `process.stdin.on("data", data => {
  const num = parseInt(data.toString().trim(), 10);
  console.log(isEven(num));
});`,
    testInputs: `[
  {
    "inputs": {
      "input1": "example input"
    },
    "expectedOutput": "example output"
  },
]`,
  },
  setCreateProblem: () => null,
  changeCreateProblem: () => null,
  submitProblem: () => null,
  isProblemSubmitLoading: false,
  error: null,
};

const CreateProblemProviderContext =
  createContext<CreateProblemProviderState>(initialState);

export function CreateProblemProvider({
  children,
  ...props
}: CreateProblemProviderProps) {
  const { getAccessTokenSilently } = useAuth0();

  const [createProblem, setCreateProblem] = useState<CreateProblemDto>(
    initialState.createProblem
  );

  const changeCreateProblem: CreateProblemProviderState["changeCreateProblem"] =
    (key, value) => {
      setCreateProblem((prev) => ({
        ...prev,
        [key]: value,
      }));
    };

  const {
    mutate: submitProblem,
    isPending: isProblemSubmitLoading,
    error,
  } = useMutation({
    mutationKey: ["submit-problem"],
    mutationFn: async () => {
      const accessToken = await getAccessTokenSilently();

      return ProblemService.getInstance().createProblem(
        accessToken,
        createProblem
      );
    },
  });

  const value = {
    createProblem,
    setCreateProblem,
    changeCreateProblem,
    submitProblem,
    isProblemSubmitLoading,
    error,
  };

  return (
    <CreateProblemProviderContext.Provider {...props} value={value}>
      {children}
    </CreateProblemProviderContext.Provider>
  );
}

export const useCreateProblem = () => {
  const context = useContext(CreateProblemProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
