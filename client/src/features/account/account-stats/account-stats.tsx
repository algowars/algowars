import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useGetAccountStats } from "../api/get-account-stats";
import { useAccount } from "../account.provider";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

type AccountStatsProps = {
  className?: string;
};

export const AccountStats = ({ className }: AccountStatsProps) => {
  const { account } = useAccount();
  const { getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState<string>("");

  const statsQuery = useGetAccountStats({
    username: account?.username ?? "",
    accessToken,
  });

  useEffect(() => {
    let isMounted = true;
    (async () => {
      if (!accessToken) {
        const token = await getAccessTokenSilently();
        if (isMounted) setAccessToken(token);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently, accessToken]);

  return (
    <Card className={cn("bg-sidebar", className)}>
      <CardHeader>
        <CardTitle>Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-5">
          <li className="flex items-center">
            <span className="text-sm">Total Submissions</span>
            <span className="ml-auto font-semibold text-sm text-muted-foreground">
              {statsQuery.data?.totalSubmissions
                ? statsQuery.data.totalSubmissions
                : 0}
            </span>
          </li>
          <li className="flex items-center">
            <span className="text-sm">Total Solutions</span>
            <span className="ml-auto font-semibold text-sm text-muted-foreground">
              {statsQuery.data?.totalSolutions
                ? statsQuery.data.totalSolutions
                : 0}
            </span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};
