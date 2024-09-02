import { Link } from '@/components/ui/link';
import { DocNavLink } from '../../models/doc-nav-link.model';

type Props = {
  links: DocNavLink[];
};

export const DocsNav = ({ links }: Props) => {
  return (
    <ul>
      {links.map((link) => (
        <li key={link.name}>
          <Link to={link.href}>{link.name}</Link>
          {link?.children ? <DocsNav links={link?.children} /> : null}
        </li>
      ))}
    </ul>
  );
};
