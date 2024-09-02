import { buttonVariants } from '../ui/button';
import { Link } from '../ui/link';
import logo from '@/assets/logo.svg';

const Logo = () => {
  return (
    <Link className="flex items-center" to="/">
      <img className="h-8 w-auto" src={logo} alt="Workflow" />
      <span className="text-sm font-semibold">Algowars</span>
    </Link>
  );
};

export const Navbar = () => {
  return (
    <nav className="border-b">
      <div className="container flex items-center py-3">
        <Logo />
        <ul className="ml-auto flex items-center gap-3">
          <li>
            <Link to="/" className={buttonVariants({ variant: 'ghost' })}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/" className={buttonVariants({ variant: 'ghost' })}>
              Docs
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
