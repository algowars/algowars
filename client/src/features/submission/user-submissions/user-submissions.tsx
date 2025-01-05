import { Card } from "@/components/ui/card";
import { useGetUserSubmissionsByUsername } from "../api/get-user-submissions-by-username";

type UserSubmissionsProps = {
  username: string;
};

export const UserSubmissions = ({ username }: UserSubmissionsProps) => {
  const getUserSubmissionsQuery = useGetUserSubmissionsByUsername({ username });

  if (!getUserSubmissionsQuery.data) {
    return null;
  }

  console.log(getUserSubmissionsQuery.data);

  return (
    <ul className="flex flex-col gap-5">
      {getUserSubmissionsQuery.data?.submissions.map((sub) => (
        <li key={sub.id}>
          <Card className="p-5 bg-zinc-900 flex flex-col gap-3">
            <h4 className="text-2xl font-bold">{sub.problem?.title}</h4>
            <p>{sub.status}</p>
            <pre className="p-3 border rounded-lg">{sub.sourceCode}</pre>
          </Card>
        </li>
      ))}
    </ul>
  );
};
