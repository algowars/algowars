import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/use-app-selector";
import { useAuth0 } from "@auth0/auth0-react";
import { X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const AccountExistBanner = () => {
  const { account } = useAppSelector((state) => state.account);
  const { isAuthenticated } = useAuth0();
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return isAuthenticated && !account?.id && isOpen ? (
    <div className="p-1 bg-primary text-primary-foreground flex items-center justify-between text-sm">
      <p></p>
      <p>
        You haven't finished setting up your account. To access features,{" "}
        <Link to="/account/setup" className="underline underline-offset-2">
          click here
        </Link>
      </p>
      <Button className="w-10 h-10 p-0" onClick={() => setIsOpen(false)}>
        <X size={16} />
      </Button>
    </div>
  ) : null;
};

export default AccountExistBanner;
