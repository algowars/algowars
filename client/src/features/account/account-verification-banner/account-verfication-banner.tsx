import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { routerConfig } from "@/app/router-config";
import { AccountStatus, useAccount } from "../account.provider";

const AccountVerficiationBanner = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const navigate = useNavigate();
  const { isLoading, status } = useAccount();

  const redirectToAccountSetup = () => {
    setIsOpen(false);
    navigate(routerConfig.accountSetup.path);
  };

  if (isLoading) {
    return null;
  }

  if (status !== AccountStatus.PartiallyAuthenticated) {
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
