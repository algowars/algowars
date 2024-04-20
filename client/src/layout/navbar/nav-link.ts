export interface NavLink {
  title: string;
  href: string;
  description?: string;
  children?: NavLink[];
}
