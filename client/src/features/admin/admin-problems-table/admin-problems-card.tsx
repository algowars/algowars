import { PaginationProvider } from "@/components/pagination/pagination-context.provider";
import { AdminProblemsTable } from "./admin-problems-table";

export const AdminProblemsCard = () => {
  return (
    <div className="w-full flex flex-col gap-3 overflow-x-auto">
      <PaginationProvider>
        <AdminProblemsTable />
      </PaginationProvider>
    </div>
  );
};
