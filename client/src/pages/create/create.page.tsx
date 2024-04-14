import CreateProblem from "@/features/create/create-problem/create-problem";
import { CreateProblemProvider } from "@/features/create/create-problem/create-problem.provider";
import LayoutFull from "@/layout/layout-full/layout-full";

const CreatePage = () => {
  return (
    <LayoutFull>
      <CreateProblemProvider>
        <CreateProblem />
      </CreateProblemProvider>
    </LayoutFull>
  );
};

export default CreatePage;
