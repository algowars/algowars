import { PaginationProvider } from "@/components/pagination/pagination-context.provider";
import { PaginationFooter } from "@/components/pagination/pagination-footer";
import { useGetProblemsPaginated } from "../api/get-problems-paginated";
import { useState } from "react";
import { Problem } from "../models/problem.model";
import { PaginationResult } from "@/features/common/pagination/pagination-result";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { routerConfig } from "@/app/router";

export const ProblemsTable = () => {
  const navigate = useNavigate();
  const [problemsPaginated, setProblemsPaginated] =
    useState<PaginationResult<Problem> | null>(null);
  const getProblemsPaginatedMutation = useGetProblemsPaginated({
    mutationConfig: {
      onSuccess: (paginationResponse) => {
        setProblemsPaginated(paginationResponse);
      },
    },
  });

  const getProblemsPaginated = async (
    page: number,
    size: number,
    timestamp: Date
  ) => {
    getProblemsPaginatedMutation.mutate({
      page,
      size,
      timestamp,
    });
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <PaginationProvider paginationMutation={getProblemsPaginated}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {problemsPaginated?.results.map((problem) => (
              <TableRow
                key={problem.id}
                onClick={() =>
                  navigate(routerConfig.problem.execute(problem.slug))
                }
              >
                <TableCell>{problem.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <PaginationFooter
          className="w-full"
          totalPages={problemsPaginated?.totalPages ?? 0}
        />
      </PaginationProvider>
    </div>
  );
};
