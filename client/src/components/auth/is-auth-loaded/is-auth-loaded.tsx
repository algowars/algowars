import { PageLoader } from "@/components/loader/page-loader/page-loader";
import { useAccountStore } from "@/features/account/account-store.provider";
import { useAuth0 } from "@auth0/auth0-react";
import { ReactNode } from "react";

export const IsAuthLoaded = ({ children }: { children?: ReactNode }) => {
  const { isLoading } = useAuth0();
  const { isLoading: isAccountLoading } = useAccountStore();

  console.log(isLoading, isAccountLoading);

  if (isAccountLoading || isLoading) {
    return (
      <div>
        <PageLoader />
      </div>
    );
  }

  return <>{children}</>;
};
