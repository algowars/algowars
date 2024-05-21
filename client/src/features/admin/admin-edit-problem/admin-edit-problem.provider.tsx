import { ReactNode, createContext, useContext, useState } from "react";
import { AdminEditProblemDto } from "./dtos/admin-edit-problem.dto";

type AdminEditProblemProps = {
  children: ReactNode;
};

export type AdminEditProblemState = {
  editProblem: AdminEditProblemDto;
  changeEditProblem: <K extends keyof AdminEditProblemDto>(
    key: K,
    value: AdminEditProblemDto[K]
  ) => void;
};

const initialState: AdminEditProblemState = {
  editProblem: {
    title: "",
    slug: "",
    question: "",
  },
  changeEditProblem: () => null,
};

const AdminEditProblemProviderContext =
  createContext<AdminEditProblemState>(initialState);

export function AdminEditProblemProvider({
  children,
  ...props
}: AdminEditProblemProps) {
  const [editProblem, setEditProblem] = useState<AdminEditProblemDto>(
    initialState.editProblem
  );

  const changeEditProblem: AdminEditProblemState["changeEditProblem"] = (
    key,
    value
  ) => {
    setEditProblem((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const value = {
    editProblem,
    changeEditProblem,
  };

  return (
    <AdminEditProblemProviderContext.Provider {...props} value={value}>
      {children}
    </AdminEditProblemProviderContext.Provider>
  );
}

export const useAdminEditProblem = () => {
  const context = useContext(AdminEditProblemProviderContext);

  if (context === undefined) {
    throw new Error(
      "useAdminEditProblem must be used within a AdminEditProblemProvider"
    );
  }

  return context;
};
