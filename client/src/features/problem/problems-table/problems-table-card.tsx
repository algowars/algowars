import { PaginationProvider } from "@/components/pagination/pagination-context.provider";
import { ProblemsTable } from "./problems-table";

export const ProblemsTableCard = () => {
  return (
    <div className="w-full flex flex-col gap-3 overflow-x-auto">
      <PaginationProvider>
        <ProblemsTable />
      </PaginationProvider>
    </div>
  );
};
