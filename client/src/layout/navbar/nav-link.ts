import { ReactNode } from "react";

export interface NavLink {
  name: string;
  href?: string;
  element?: ReactNode;
  className?: string;
}
