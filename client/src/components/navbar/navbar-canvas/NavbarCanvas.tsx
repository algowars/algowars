import { Link } from "react-router-dom";
import ButtonLight from "../../button/button-light/ButtonLight";
import NavbarItems from "../navbar-items/NavbarItems";
import Card from "../../card/Card";
import ButtonLogin from "../../button/button-login/ButtonLogin";
import ButtonSignup from "../../button/button-signup/ButtonSignup";
import { useAuth0 } from "@auth0/auth0-react";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavbarCanvas = ({ isOpen, setIsOpen }: Props) => {
  const { isAuthenticated } = useAuth0();

  const closeCanvas = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div
        className={`${isOpen ? "" : "hidden"} lg:hidden navbar-canvas-backdrop`}
        onClick={closeCanvas}
      ></div>
      <div
        className={`${
          isOpen ? "left-0" : "-left-[200%]"
        } fixed duration-200 ease-out top-0 w-11/12 min-[425px]:w-9/12 min-[500px]:w-7/12 lg:hidden border-r border-zinc-300 text-black drop-shadow bg-white min-h-[100vh] z-50`}
      >
        <div className="border-b border-zinc-300 p-3 flex justify-between items-center">
          <Link to="/" className="py-0">
            <h1 className="text-lg font-semibold">Ai Adlibs</h1>
          </Link>
          <ButtonLight
            size="w-8 h-8"
            className="flex justify-center items-center"
            onClick={closeCanvas}
            hideUnerline
          >
            <i className="fa-solid fa-xmark"></i>
          </ButtonLight>
        </div>
        <div className="p-3">
          {!isAuthenticated ? (
            <Card className="flex flex-col gap-5 mb-3">
              <p>
                Join the Ai Adlibs community to save you're ai generated adlibs
              </p>
              <div className="flex flex-col gap-3">
                <ButtonSignup className="w-full" />
                <ButtonLogin className="w-full" />
              </div>
            </Card>
          ) : null}
          <NavbarItems />
        </div>
      </div>
    </>
  );
};

export default NavbarCanvas;
