import { useAuth0 } from "@auth0/auth0-react";
import { useAdminEditProblem } from "./admin-edit-problem.provider";
import { useMutation } from "@tanstack/react-query";
import { problemService } from "@/features/problem/services/problem.service";

const AdminEditProblem = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { editProblem } = useAdminEditProblem();

  const {
    mutate: updateProblem,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["edit-problem"],
    mutationFn: async () => {
      const accessToken = await getAccessTokenSilently();

      // return problemService.createPro
      return null;
    },
  });
  return (
    <div
    
  )
};

export default AdminEditProblem;
