import { useAuth0 } from "@auth0/auth0-react";
import { useAccountStore } from "../account-store.provider";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { routerConfig } from "@/app/router";

const AccountVerficiationBanner = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { isLoading, isAuthenticated, status } = useAccountStore();
  const navigate = useNavigate();
  const { isLoading: isAuthLoading, isAuthenticated: isAuthAuthenticated } =
    useAuth0();

  const redirectToAccountSetup = () => {
    setIsOpen(false);
    navigate(routerConfig.accountSetup.path);
  };

  if (
    isLoading ||
    isAuthLoading ||
    !isAuthAuthenticated ||
    status === "ERR_NETWORK"
  ) {
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
        <Button
          variant="link"
          className="text-background px-1"
          onClick={redirectToAccountSetup}
        >
          Click Here
        </Button>
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
