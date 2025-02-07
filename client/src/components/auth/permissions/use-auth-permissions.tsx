import { env } from "@/config/env";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

export const useAuthPermissions = () => {
  const { getIdTokenClaims } = useAuth0();
  const namespace = env.AUTH_NAMESPACE;
  const [roles, setRoles] = useState<string[]>([]);
  useEffect(() => {
    (async () => {
      const claim = await getIdTokenClaims();

      if (claim) {
        const foundRoles = await claim[namespace];

        if (Array.isArray(foundRoles)) {
          setRoles(foundRoles);
        }
      }
    })();
  }, [getIdTokenClaims, namespace]);

  return { roles };
};
