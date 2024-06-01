import { NavLink } from "@/layout/navbar/nav-link";

export const useCreateNav = () => {
  const links: NavLink[] = [
    {
      name: "Create Problem",
      href: "problem",
    },
    {
      name: "Test setup",
      href: "test-setup",
    },
  ];

  return { links };
};
