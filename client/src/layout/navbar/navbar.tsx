import { useAuth0 } from "@auth0/auth0-react";
import NavbarSignedIn from "./navbar-signed-in/navbar-signed-in";
import NavbarLoggedOut from "./navbar-logged-out/navbar-logged-out";

type Props = {
  width?: string;
  className?: string;
  boder?: string;
};

const Navbar = (props: Props) => {
  const { isAuthenticated } = useAuth0();
  return isAuthenticated ? (
    <NavbarSignedIn {...props} />
  ) : (
    <NavbarLoggedOut {...props} />
  );
};

export default Navbar;
