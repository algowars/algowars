import { useState } from "react";
import { useGetServerHealth } from "../api/get-server-health";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export const ServerHealthBanner = () => {
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const { isPending, isError, data } = useGetServerHealth({
    queryConfig: {
      refetchInterval: (data: any) => {
        return data?.state?.data?.status === "ok" || isClosed ? false : 7_000;
      },
    },
  });

  if (isClosed) {
    return null;
  }

  if (isPending) {
    return (
      <div className="px-5 py-3 bg-foreground text-background text-sm font-bold flex justify-between items-center">
        <span>Server is spinning up, please wait...</span>
        <Button
          className="h-6 p-0 w-6 hover:bg-foreground hover:text-background"
          variant="ghost"
          onClick={() => setIsClosed(true)}
        >
          <X size={16} />
        </Button>
      </div>
    );
  }

  if (isError || data?.status !== "ok") {
    return (
      <div className="px-5 py-3 bg-foreground text-background text-sm font-bold flex justify-between items-center">
        <span>Server is spinning up, please wait...</span>
        <Button
          className="h-6 p-0 w-6 hover:bg-foreground hover:text-background"
          variant="ghost"
          onClick={() => setIsClosed(true)}
        >
          <X size={16} />
        </Button>
      </div>
    );
  }

  return null;
};
