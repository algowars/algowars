import { useState } from "react";
import NavbarAvatarDropdown from "./navbar-avatar-dropdown/NavbarAvatarDropdown";
import OutsideAlerter from "../../outside-alerter/OutsideAlerter";
import Avatar from "../../avatar/Avatar";

type Props = {
  width?: string;
  height?: string;
  avatarUrl?: string;
  id?: string;
};

const NavbarAvatar = ({
  width = "w-8",
  height = "h-8",
  avatarUrl,
  id = "",
}: Props) => {
  const [isDropdownOpen, setIsDropdownOpoen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsDropdownOpoen((curr) => !curr);
  };

  const closeDropdown = () => {
    setIsDropdownOpoen(false);
  };
  return (
    <OutsideAlerter executable={closeDropdown}>
      <button
        id="navbar-avatar-button"
        className="p-1 hover:bg-zinc-300 duration-200 ease-out rounded-full"
        onClick={toggleDropdown}
      >
        <Avatar avatarUrl={avatarUrl} width={width} height={height} id={id} />
      </button>
      {isDropdownOpen && <NavbarAvatarDropdown />}
    </OutsideAlerter>
  );
};

export default NavbarAvatar;
