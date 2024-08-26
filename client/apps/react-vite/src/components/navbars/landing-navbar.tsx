import logo from '@/assets/logo.svg';
import { Link } from '../ui/link';
import { LoginButton } from '@/features/auth/components/login-button';
import { SignupButton } from '@/features/auth/components/sign-up-button';

const Logo = () => {
  return (
    <Link className="flex items-center" to="/">
      <img className="h-8 w-auto" src={logo} alt="Workflow" />
      <span className="text-sm font-semibold">Algowars</span>
    </Link>
  );
};

export const LandingNavbar = () => {
  return (
    <nav className="border-b">
      <div className="container py-3 flex justify-between">
        <Logo />
        <ul className="flex items-center gap-3">
          <li>
            <LoginButton />
          </li>
          <li>
            <SignupButton />
          </li>
        </ul>
      </div>
    </nav>
  );
};
