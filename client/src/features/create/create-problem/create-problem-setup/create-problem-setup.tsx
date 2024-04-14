import { Label } from "@/components/ui/label";
import CreateProblemLanguage from "../create-problem-language/create-problem-language";

const CreateProblemSetup = () => {
  return (
    <section>
      <div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="language">Language</Label>
          <CreateProblemLanguage />
        </div>
      </div>
    </section>
  );
};

export default CreateProblemSetup;
