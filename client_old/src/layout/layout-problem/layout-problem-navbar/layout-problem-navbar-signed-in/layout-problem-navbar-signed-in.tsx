import NavbarAvatar from "@/layout/navbar/navbar-avatar/navbar-avatar";
import { useAuth0 } from "@auth0/auth0-react";

const LayoutProblemNavbarSignedIn = () => {
  const { user } = useAuth0();

  return (
    <ul className="flex items-center gap-1 text-sm">
      <li>
        <NavbarAvatar url={user?.picture} />
      </li>
    </ul>
  );
};

export default LayoutProblemNavbarSignedIn;
