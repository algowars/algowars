import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/use-app-dispatch";
import { setRoles } from "@/slices/roles-slice";

const namespace = import.meta.env.VITE_AUTH0_USER_ROLE_NAMESPACE ?? "";

export const useAuthRoles = () => {
  const { isAuthenticated, user, isLoading } = useAuth0();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      const foundRoles = user[namespace];

      if (Array.isArray(foundRoles) && foundRoles.length) {
        dispatch(setRoles(foundRoles));
      }
    }
  }, [dispatch, isAuthenticated, isLoading, user]);
};
