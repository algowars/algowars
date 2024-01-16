import { useAuth0 } from "@auth0/auth0-react";
import { useAppSelector } from "./useAppSelector";

enum AccountStatus {
  NOT_SIGNED_IN,
  ACCOUNT_NOT_SETUP,
  ACCOUNT_SETUP,
}

export const useAccountExistence = () => {
  const { user } = useAuth0();
  const { account } = useAppSelector((state) => state.account);

  const getAccountStatus = () => {
    console.log(user, account);
    if (!user) {
      return {
        status: AccountStatus.NOT_SIGNED_IN,
      };
    }
    if (!account?.id) {
      return {
        status: AccountStatus.ACCOUNT_NOT_SETUP,
      };
    }
    return {
      status: AccountStatus.ACCOUNT_SETUP,
    };
  };
  return { getAccountStatus, AccountStatus };
};
