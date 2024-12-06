import { useAuth0 } from "@auth0/auth0-react";
import { useAccountStore } from "../account-store.provider";
import { Link } from "@/components/ui/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const AccountVerficiationBanner = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { isLoading, isAuthenticated } = useAccountStore();
  const { isLoading: isAuthLoading, isAuthenticated: isAuthAuthenticated } =
    useAuth0();

  console.log(
    isLoading,
    isAuthenticated,
    "AUTH: ",
    isAuthLoading,
    isAuthAuthenticated
  );

  if (isLoading || isAuthLoading || !isAuthAuthenticated) {
    return null;
  }

  if (isAuthAuthenticated && isAuthenticated) {
    return null;
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="p-1.5 bg-foreground text-background text-sm flex justify-center items-center">
      <span className="ml-auto">
        Your account is not finished being setup. To finish setting up your
        account{" "}
        <Link to="app/account/setup" className="underline underline-offset-3">
          Click Here
        </Link>
      </span>

      <Button
        className="ml-auto w-8 h-8 p-0 hover:bg-foreground hover:text-background"
        variant="ghost"
        onClick={() => setIsOpen(false)}
      >
        <X size={16} />
      </Button>
    </div>
  );
};

export default AccountVerficiationBanner;
