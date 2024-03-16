import { useAppSelector } from "@/store/use-app-selector";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const AccountExistBanner = () => {
  const { account } = useAppSelector((state) => state.account);
  const { isAuthenticated } = useAuth0();
  return isAuthenticated && !account?.id ? (
    <div className="p-3 bg-red-500 text-center">
      {" "}
      You haven't finished setting up your account. To access features,{" "}
      <Link to="/account-setup" className="hover:underline underline-offset-2">
        click here
      </Link>
    </div>
  ) : null;
};

export default AccountExistBanner;
