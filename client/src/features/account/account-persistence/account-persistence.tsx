import { useAuth0 } from "@auth0/auth0-react";

export const AccountPersistence = () => {
  const { user } = useAuth0();

  console.log(user);

  return null;
};
