import CreateProblem from "@/features/create/create-problem/create-problem";
import { CreateProblemProvider } from "@/features/create/create-problem/create-problem.provider";

const CreateProblemPage = () => {
  return (
    <CreateProblemProvider>
      <CreateProblem />
    </CreateProblemProvider>
  );
};

export default CreateProblemPage;
