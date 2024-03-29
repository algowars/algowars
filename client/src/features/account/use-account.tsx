import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/use-app-dispatch";
import { setAccount } from "@/slices/account-slice";
import { setError } from "@/slices/error-slice";
import { accountService } from "./services/account.service";
import { setPlayer } from "@/slices/player-slice";

export const useAccount = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const dispatch = useAppDispatch();

  const response = useQuery({
    queryKey: ["account", isAuthenticated],
    queryFn: async () => {
      if (isAuthenticated) {
        const accessToken = await getAccessTokenSilently();

        const account = await accountService.getAccountBySub(accessToken);

        if (account.player) {
          dispatch(setPlayer(account.player));
        }

        return account;
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
    if (response.error) {
      dispatch(setError(response.error));
    }
  }, [dispatch, response.error]);

  return response;
};
