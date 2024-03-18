import { Link } from "react-router-dom";
import { NavLink } from "./nav-link";
import Container from "../container/container";

type Props = {
  navLinks: NavLink[];
  width?: string;
  className?: string;
};

const Navbar = ({ navLinks, width, className }: Props) => {
  return (
    <nav className={`sticky top-0 border-b py-3 ${className}`}>
      <Container
        className="flex justify-between items-center gap-5"
        width={width}
      >
        <ul className="flex items-center gap-5">
          <li>
            <Link to="/">
              <h1 className="text-lg font-semibold">Algowars</h1>
            </Link>
          </li>
        </ul>
        <ul className="flex items-center gap-5">
          {navLinks.map((link) => (
            <li key={link.name} className="flex items-center justify-center">
              {link.href ? (
                <Link to={link.href}>{link.name}</Link>
              ) : (
                link.element
              )}
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
};

export default Navbar;
