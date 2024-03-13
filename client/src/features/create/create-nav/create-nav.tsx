import { NavLink } from "react-router-dom";
import { useCreateNav } from "./use-create-nav";
import { buttonVariants } from "@/components/ui/button";

const CreateNav = () => {
  const { links } = useCreateNav();
  return (
    <ul className="flex gap-5">
      {links.map((link) => (
        <li key={link.name}>
          {link.href ? (
            <NavLink
              to={link.href}
              className={({ isActive }) =>
                buttonVariants({ variant: isActive ? "secondary" : "ghost" })
              }
            >
              {link.name}
            </NavLink>
          ) : null}
        </li>
      ))}
    </ul>
  );
};

export default CreateNav;
