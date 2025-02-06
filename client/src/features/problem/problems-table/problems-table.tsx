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
import { DifficultyBadge } from "@/components/difficulty-badge/difficulty-badge";
import { routerConfig } from "@/app/router-config";

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
    <div className="w-full flex flex-col gap-3 overflow-x-auto">
      <PaginationProvider paginationMutation={getProblemsPaginated}>
        <Table className="min-w-[37.5rem]">
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Difficulty</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {problemsPaginated?.results.map((problem) => (
              <TableRow
                key={problem.id}
                onClick={() =>
                  navigate(routerConfig.problem.execute(problem.slug))
                }
                className="hover:cursor-pointer"
              >
                <TableCell>{problem.title}</TableCell>
                <TableCell>
                  {problem?.tags?.map((tag) => tag.name).join(", ")}
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
          totalPages={problemsPaginated?.totalPages ?? 0}
        />
      </PaginationProvider>
    </div>
  );
};
