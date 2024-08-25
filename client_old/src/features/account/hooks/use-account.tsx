import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/use-app-dispatch";
import { setAccount } from "@/slices/account-slice";
import { setError } from "@/slices/error-slice";
import { AccountService } from "../services/account.service";

export const useAccount = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const dispatch = useAppDispatch();

  const response = useQuery({
    queryKey: ["account", isAuthenticated],
    queryFn: async () => {
      if (isAuthenticated) {
        const accessToken = await getAccessTokenSilently();

        const account = await AccountService.getInstance().getBySub(
          accessToken
        );
        return account;
      }

      return null;
    },
    retry: false,
  });

  useEffect(() => {
    if (response.data) {
      dispatch(setAccount(response.data));
    }
  }, [response.data, dispatch, response]);

  useEffect(() => {
    if (response.error) {
      dispatch(setError(response.error));
    }
  }, [dispatch, response.error]);

  return response;
};
