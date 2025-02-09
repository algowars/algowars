import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAdminProblems } from "../admin-create-problem/api/get-admin-problems";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader } from "@/components/loader/loader";
import { DifficultyBadge } from "@/components/difficulty-badge/difficulty-badge";
import { routerConfig } from "@/app/router-config";
import { usePagination } from "@/components/pagination/pagination-context.provider";
import { PaginationFooter } from "@/components/pagination/pagination-footer";

export const AdminProblemsTable = () => {
  const navigate = useNavigate();
  const { page, size, timestamp } = usePagination();
  const { getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState<string>("");

  const adminProblemsQuery = useGetAdminProblems({
    accessToken,
    page,
    size,
    timestamp,
  });

  useEffect(() => {
    (async () => {
      if (!accessToken) {
        const token = await getAccessTokenSilently();
        setAccessToken(token);
      }
    })();
  }, [accessToken, getAccessTokenSilently]);

  if (adminProblemsQuery.isPending) {
    return (
      <div className="flex justify-center items-center">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <>
      <Table className="min-w-[37.5rem] mb-3">
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!adminProblemsQuery.data ? (
            <TableRow>
              <span className="py-3 text-center block">
                No Problems Available
              </span>
            </TableRow>
          ) : null}
          {adminProblemsQuery.data?.results.map((problem) => (
            <TableRow
              key={problem.id}
              onClick={() =>
                navigate(routerConfig.problem.execute(problem.slug))
              }
              className="hover:cursor-pointer"
            >
              <TableCell>{problem.title}</TableCell>
              <TableCell className="text-muted-foreground">
                {problem?.tags?.join(", ")}
              </TableCell>
              <TableCell>
                <DifficultyBadge difficulty={problem.difficulty} />
              </TableCell>
              <TableCell className="text-muted-foreground">
                {problem.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationFooter
        className="w-full"
        totalPages={adminProblemsQuery.data?.totalPages ?? 0}
      />
    </>
  );
};
