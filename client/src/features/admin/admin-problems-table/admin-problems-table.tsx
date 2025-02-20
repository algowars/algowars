import { useEffect, useState } from "react";
import { useGetAdminProblems } from "../api/get-admin-problems";
import { useAuth0 } from "@auth0/auth0-react";
import { Loader } from "@/components/loader/loader";
import { usePagination } from "@/components/pagination/pagination-context.provider";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { AdminProblemsDataTable } from "./admin-problems-data-table";
import { columns } from "./admin-problems-tables-column";

export const AdminProblemsTable = () => {
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
    if (adminProblemsQuery.isError) {
      let errorMessage: string;
      if (isAxiosError(adminProblemsQuery.error)) {
        errorMessage =
          adminProblemsQuery.error.response?.data?.message ||
          adminProblemsQuery.error.message;
      } else {
        errorMessage = (adminProblemsQuery.error as Error).message;
      }
      toast(`Error getting challenge: "${errorMessage}"`);
    }
  }, [adminProblemsQuery.error, adminProblemsQuery.isError]);

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
    <div className="min-w-[37.5rem] mb-3 flex flex-col gap-5">
      <AdminProblemsDataTable
        columns={columns}
        data={adminProblemsQuery?.data?.results ?? []}
      />
    </div>
  );
};
