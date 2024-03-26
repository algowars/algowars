import { Submission } from "@/features/submission/sbumission.model";

type Props = {
  submission: Submission;
};

const ProfileSubmissionsCard = ({ submission }: Props) => {
  console.log(submission);
  return <div>ProfileSubmissionsCard</div>;
};

export default ProfileSubmissionsCard;
