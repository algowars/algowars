import { useEffect, useState } from "react";
import { AdminProblemList } from "./admin-problem-list/admin-problem-list";
import { useAuth0 } from "@auth0/auth0-react";
import { useGetAdminProblems } from "./api/admin-problems";

export const AdminProblems = () => {
  const [accessToken, setAccessToken] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(25);
  const [timestamp] = useState<Date>(new Date());
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    (async () => {
      if (isAuthenticated) {
        setAccessToken((await getAccessTokenSilently()) ?? "");
      }
    })();
  }, [isAuthenticated, getAccessTokenSilently]);

  const adminProblemsQuery = useGetAdminProblems({
    page,
    size,
    timestamp,
    accessToken,
  });

  console.log(adminProblemsQuery.data);

  return (
    <div>
      <AdminProblemList problems={adminProblemsQuery.data?.results ?? []} />
    </div>
  );
};
