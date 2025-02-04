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
    <Table className="min-w-full border-separate border-spacing-0">
      <TableHeader>
        <TableRow>
          <TableHead className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
            Problem
          </TableHead>
          <TableHead className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
            Status
          </TableHead>
          <TableHead className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
            Date
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {submissions.map((sub) => (
          <TableRow
            key={sub.id}
            className="cursor-pointer hover:bg-zinc-800 transition-colors"
            onClick={() =>
              navigate(routerConfig.problem.execute(sub.problemSlug))
            }
          >
            <TableCell className="px-4 py-2 font-semibold text-white">
              {sub.problemTitle}
            </TableCell>
            <TableCell className="px-4 py-2">
              {sub.status ? <SubmissionStatusView status={sub.status} /> : null}
            </TableCell>
            <TableCell className="px-4 py-2 text-sm text-gray-400">
              {formatDate(sub.createdAt)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
