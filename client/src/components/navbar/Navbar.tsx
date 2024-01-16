import NavbarSignedIn from "./navbar-signed-in/NavbarSignedIn";
import NavbarNotSignedIn from "./navbar-not-signed-in/NavbarNotSignedIn";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import Container from "../container/Container";
import ButtonLight from "../button/button-light/ButtonLight";
import { useState } from "react";
import NavbarCanvas from "./navbar-canvas/NavbarCanvas";

const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  const [isCanvasOpen, setIsCanvasOpen] = useState<boolean>(false);

  const toggleCanvas = () => {
    setIsCanvasOpen((curr) => !curr);
  };

  return (
    <nav className="bg-white text-white border-b border-zinc-300 text-black">
      <Container className="p-2 flex justify-between items-center relative">
        <NavbarCanvas isOpen={isCanvasOpen} setIsOpen={setIsCanvasOpen} />
        <ul className="flex items-center gap-1 sm:gap-2 md:gap-3">
          <li className="lg:hidden">
            <ButtonLight
              size="w-8 h-8"
              className="flex items-center justify-center"
              hideUnerline
              onClick={toggleCanvas}
            >
              <i className="fa-solid fa-bars"></i>
            </ButtonLight>
          </li>
          <li>
            <Link to="/">
              <h1 className="text-lg font-semibold text-black">Ai Adlibs</h1>
            </Link>
          </li>
        </ul>

        {isAuthenticated ? <NavbarSignedIn /> : <NavbarNotSignedIn />}
      </Container>
    </nav>
  );
};

export default Navbar;
