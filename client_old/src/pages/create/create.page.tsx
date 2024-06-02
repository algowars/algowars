import CreateProblem from "@/features/create/create-problem/create-problem";
import { CreateProblemProvider } from "@/features/create/create-problem/create-problem.provider";
import LayoutFull from "@/layout/layout-full/layout-full";

const CreatePage = () => {
  return (
    <LayoutFull className="flex flex-col min-h-screen relative">
      <CreateProblemProvider>
        <CreateProblem />
      </CreateProblemProvider>
    </LayoutFull>
  );
};

export default CreatePage;
