import { Card } from "@/components/ui/card";
import ProblemEditor from "@/features/problem/problem-editor/ProblemEditor";
import LayoutSolid from "@/layout/layout-solid/LayoutSolid";

const AdminCreate = () => {
  return (
    <LayoutSolid>
      <div className="py-5 flex flex-col gap-5 px-3">
        <Card className="p-5 flex flex-col gap-5">
          <h1 className="text-2xl font-semibold">Admin Create</h1>
        </Card>
        <ProblemEditor />
      </div>
    </LayoutSolid>
  );
};

export default AdminCreate;
