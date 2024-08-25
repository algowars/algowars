import Logo from "@/components/logo/logo";
import { useAuth0 } from "@auth0/auth0-react";
import LayoutProblemNavbarSignedIn from "./layout-problem-navbar-signed-in/layout-problem-navbar-signed-in";
import LayoutProblemNavbarLoggedOut from "./layout-problem-navbar-logged-out/layout-problem-navbar-logged-out";

const LayoutProblemNavbar = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <nav className="h-14">
      <div className="flex justify-between h-full items-center gap-5 px-5">
        <ul className="flex">
          <li>
            <Logo />
          </li>
        </ul>
        {isAuthenticated ? (
          <LayoutProblemNavbarSignedIn />
        ) : (
          <LayoutProblemNavbarLoggedOut />
        )}
      </div>
    </nav>
  );
};

export default LayoutProblemNavbar;
