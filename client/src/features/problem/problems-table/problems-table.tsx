import { usePagination } from "@/components/pagination/pagination-context.provider";
import { useGetProblems } from "../api/get-problems-paginated";
import { Loader } from "@/components/loader/loader";
import { useEffect } from "react";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { ProblemDataTable } from "./problem-data-table";
import { columns } from "./problem-tables-columns";

export const ProblemsTable = () => {
  const { page, size, timestamp } = usePagination();

  const problemsQuery = useGetProblems({ page, size, timestamp });

  useEffect(() => {
    if (problemsQuery.isError) {
      let errorMessage: string;
      if (isAxiosError(problemsQuery.error)) {
        errorMessage =
          problemsQuery.error.response?.data?.message ||
          problemsQuery.error.message;
      } else {
        errorMessage = (problemsQuery.error as Error).message;
      }
      toast(`Error getting challenge: "${errorMessage}"`);
    }
  }, [problemsQuery.error, problemsQuery.isError]);

  if (problemsQuery.isPending) {
    return (
      <div className="flex justify-center items-center">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="min-w-[37.5rem] mb-3 flex flex-col gap-5">
      <ProblemDataTable
        columns={columns}
        data={problemsQuery?.data?.results ?? []}
      />
    </div>
  );
};
