import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { accountService } from "./services/account-service";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/use-app-dispatch";
import { setAccount } from "@/slices/account-slice";
import { setError } from "@/slices/error-slice";

export const useAccount = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const dispatch = useAppDispatch();

  const response = useQuery({
    queryKey: ["account", isAuthenticated],
    queryFn: async () => {
      if (isAuthenticated) {
        const accessToken = await getAccessTokenSilently();

        return accountService.getAccountBySub(accessToken);
      }

      return null;
    },
  });

  useEffect(() => {
    if (response.data) {
      dispatch(setAccount(response.data));
    }
  }, [response.data, dispatch, response]);

  useEffect(() => {
    console.log(response.error);
    if (response.error) {
      dispatch(setError(response.error));
    }
  }, [dispatch, response.error]);

  return response;
};
