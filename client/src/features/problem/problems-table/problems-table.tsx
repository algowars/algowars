import { usePagination } from "@/components/pagination/pagination-context.provider";
import { PaginationFooter } from "@/components/pagination/pagination-footer";
import { useGetProblems } from "../api/get-problems-paginated";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { DifficultyBadge } from "@/components/difficulty-badge/difficulty-badge";
import { routerConfig } from "@/app/router-config";
import { Loader } from "@/components/loader/loader";

export const ProblemsTable = () => {
  const navigate = useNavigate();
  const { page, size, timestamp } = usePagination();

  const problemsQuery = useGetProblems({ page, size, timestamp });

  if (problemsQuery.isPending) {
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {!problemsQuery.data ? (
            <TableRow>
              <span className="py-3 text-center block">
                No Problems Available
              </span>
            </TableRow>
          ) : null}
          {problemsQuery.data?.results.map((problem) => (
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationFooter
        className="w-full"
        totalPages={problemsQuery.data?.totalPages ?? 0}
      />
    </>
  );
};
