import ButtonLightOutline from "../../button/button-light-outline/ButtonLightOutline";
import NavbarAvatar from "../navbar-avatar/NavbarAvatar";
import { useAuth0 } from "@auth0/auth0-react";

const NavbarSignedIn = () => {
  const { user } = useAuth0();
  return (
    <ul className="flex items-center gap-5">
      <li className="hidden min-[320px]:block">
        <ButtonLightOutline href="/create">Create Adlib</ButtonLightOutline>
      </li>
      <li>
        <NavbarAvatar avatarUrl={user?.picture} />
      </li>
    </ul>
  );
};

export default NavbarSignedIn;
