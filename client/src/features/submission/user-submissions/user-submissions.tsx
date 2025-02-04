import { SubmissionStatusView } from "../submission-status-view/submission-status-view";
import { useNavigate } from "react-router-dom";
import { routerConfig } from "@/app/router";
import { formatDate } from "@/utils/format-date";
import { AccountProfile } from "@/features/account/models/account-profile";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type UserSubmissionsProps = {
  submissions: AccountProfile["recentSubmissions"];
};

export const UserSubmissions = ({ submissions }: UserSubmissionsProps) => {
  const navigate = useNavigate();

  if (!submissions.length) {
    return (
      <div className="p-5 text-center">
        <h4>No Submissions Available</h4>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Problem</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {submissions.map((sub) => (
          <TableRow
            key={sub.id}
            className="hover:cursor-pointer"
            onClick={() =>
              navigate(routerConfig.problem.execute(sub.problemSlug))
            }
          >
            <TableCell>{sub.problemTitle}</TableCell>
            <TableCell>
              {sub.status ? <SubmissionStatusView status={sub.status} /> : null}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {formatDate(sub.createdAt)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
