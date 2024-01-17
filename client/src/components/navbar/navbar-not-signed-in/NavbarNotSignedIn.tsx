import ButtonLightModeToggle from "../../button/button-lightmode-toggle/ButtonLightModeToggle";
import ButtonLogin from "../../button/button-login/ButtonLogin";
import ButtonSignup from "../../button/button-signup/ButtonSignup";

const NavbarNotSignedIn = () => {
  return (
    <ul className="flex items-center gap-5">
      <li className="hidden md:block">
        <ButtonLogin />
      </li>
      <li>
        <ButtonSignup />
      </li>
      <li>
        <ButtonLightModeToggle />
      </li>
    </ul>
  );
};

export default NavbarNotSignedIn;
