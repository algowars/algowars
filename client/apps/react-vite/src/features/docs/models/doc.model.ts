import { DocNavLink } from './doc-nav-link.model';

export interface Doc {
  title: string;
  body: string;
  links: DocNavLink[];
}
