import Logo from "@/components/logo/logo";
import NavbarAvatar from "@/layout/navbar/navbar-avatar/navbar-avatar";
import { useAuth0 } from "@auth0/auth0-react";

const LayoutProblemNavbar = () => {
  const { user } = useAuth0();

  return (
    <nav className="h-14">
      <div className="flex justify-between h-full items-center gap-5 px-5">
        <ul className="flex">
          <li>
            <Logo />
          </li>
        </ul>
        <ul className="flex items-center gap-1 text-sm">
          <li>
            <NavbarAvatar url={user?.picture} />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default LayoutProblemNavbar;
