import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { NavLink } from "./nav-link";
import { Link } from "react-router-dom";
import React from "react";
import { cn } from "@/lib/utils";

const universalLinks: NavLink[] = [
  {
    title: "Home",
    href: "/dashboard",
  },
  {
    title: "Problems",
    href: "/problems",
  },
  {
    title: "Play",
    href: "",
    children: [
      {
        title: "Code Battle",
        href: "/battle",
        description:
          "Compete against other developers solving algorithm challenges.",
      },
      {
        title: "Code Rush",
        href: "/rush",
        description:
          "Solve as many algorithm challenges as fast as you can. Finish before the time runs out.",
      },
      {
        title: "Survival",
        href: "/survival",
        description: "Solve algorithm challenges without making a mistake.",
      },
    ],
  },
];

const signedInLinks: NavLink[] = [...universalLinks];

const adminLinks: NavLink[] = [
  ...signedInLinks,
  {
    title: "Admin",
    href: "",
    children: [
      {
        title: "Create Problem",
        href: "/create",
        description: "Create problems, tests, and code setup.",
      },
    ],
  },
];

const signedOutLinks: NavLink[] = [...universalLinks];

const createLink = (link: NavLink) => {
  if (link.children && link.children.length > 0) {
    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger>{link.title}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
            {link.children.map((child) => (
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    to={child.href}
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      {child.title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      {child.description}
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }
  return (
    <NavigationMenuItem>
      <Link to={link.href}>
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          {link.title}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={ref ?? ""}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export { signedInLinks, adminLinks, signedOutLinks, createLink };
