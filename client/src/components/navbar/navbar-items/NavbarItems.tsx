import ButtonLight from "../../button/button-light/ButtonLight";

type Props = {
  links?: {
    route: string;
    name: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
};

const NavbarItems = ({
  links = [
    {
      route: "/",
      name: "Home",
      icon: <i className="fa-solid fa-house remove-underline"></i>,
    },
    {
      route: "/create",
      name: "Create",
      icon: <i className="fa-solid fa-plus remove-underline"></i>,
    },
    {
      route: "/adlib/category",
      name: "Tags",
      icon: <i className="fa-solid fa-tag remove-underline"></i>,
    },
    {
      route: "/browse",
      name: "Browse",
      icon: <i className="fa-solid fa-magnifying-glass remove-underline"></i>,
    },
    {
      route: "/saves",
      name: "Saves",
      icon: <i className="fa-solid fa-heart remove-underline"></i>,
    },
    {
      route: "/settings",
      name: "Settings",
      icon: <i className="fa-solid fa-gear"></i>,
    },
  ],
  className = "",
}: Props) => {
  return (
    <ul className={`flex flex-col gap-3${className ? ` ${className}` : ""}`}>
      {links.map((link) => (
        <li key={link.name}>
          <ButtonLight
            href={`${link.route}`}
            className="flex gap-3 items-center"
          >
            {link.icon ? link.icon : null}
            {link.name}
          </ButtonLight>
        </li>
      ))}
    </ul>
  );
};

export default NavbarItems;
