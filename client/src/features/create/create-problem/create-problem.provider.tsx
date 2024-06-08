import { createContext, useContext } from "react";

type CreateProblemProviderProps = {
  children: React.ReactNode;
};

export type CreateProblemProviderState = {};

const initialState: CreateProblemProviderState = {};

const CreateProblemProviderContext =
  createContext<CreateProblemProviderState>(initialState);

export function CreateProblemProvider({
  children,
  ...props
}: CreateProblemProviderProps) {
  const value = {};

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
