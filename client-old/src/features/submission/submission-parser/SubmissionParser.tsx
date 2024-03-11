import { Button } from "@/components/ui/button";
import { SubmissionModel } from "@/models/SubmissionModel";

type Props = {
  submission: SubmissionModel;
};

const SubmissionParser = ({ submission }: Props) => {
  console.log(submission.stdout);
  return (
    <div>
      <div>
        <Button>Test Results</Button>
      </div>
    </div>
  );
};

export default SubmissionParser;
