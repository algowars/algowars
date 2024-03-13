import { Link } from "react-router-dom";
import { NavLink } from "./nav-link";
import Container from "../container/container";

type Props = {
  navLinks: NavLink[];
};

const Navbar = ({ navLinks }: Props) => {
  return (
    <nav className="sticky top-0 border-b py-3">
      <Container className="flex justify-between items-center gap-5">
        <ul className="flex items-center gap-5">
          <li>
            <Link to="/">
              <h1 className="text-lg font-semibold">Career Quest</h1>
            </Link>
          </li>
        </ul>
        <ul className="flex items-center gap-5">
          {navLinks.map((link) => (
            <li key={link.name}>
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
