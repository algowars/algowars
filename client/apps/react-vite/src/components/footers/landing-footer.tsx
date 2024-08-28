import logo from '@/assets/logo.svg';
import { Link } from '../ui/link';

const Logo = () => {
  return (
    <Link className="flex items-center" to="/">
      <img className="h-8 w-auto" src={logo} alt="Workflow" />
      <span className="text-sm font-semibold text-white">Algowars</span>
    </Link>
  );
};

export const LandingFooter = () => {
  return (
    <footer className="bg-slate-900 text-slate-500">
      <div className="grid grid-cols-12 gap-7 container py-10">
        <div className="flex flex-col gap-5 col-span-3">
          <Logo />
          <p>
            We create digital experiences for brands and companies by using
            technology.
          </p>
        </div>
        <div className="flex flex-col gap-5 col-span-2">
          <h4 className="text-white">Company</h4>
          <ul className="flex flex-col gap-1">
            <li>
              <Link to="/about" className="text-inherit">
                About
              </Link>
            </li>
            <li>
              <Link to="/services" className="text-inherit">
                Services
              </Link>
            </li>
            <li>
              <Link to="/opportunities" className="text-inherit">
                Opportunity
              </Link>
            </li>
            <li>
              <Link to="/team" className="text-inherit">
                Meet the team
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-5 col-span-2">
          <h4 className="text-white">Customer</h4>
          <ul className="flex flex-col gap-1">
            <li>
              <Link to="/support" className="text-inherit">
                Client Support
              </Link>
            </li>
            <li>
              <Link to="/news" className="text-inherit">
                Latest news
              </Link>
            </li>
            <li>
              <Link to="/story" className="text-inherit">
                Company Story
              </Link>
            </li>
            <li>
              <Link to="/partners" className="text-inherit">
                Partners
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-5 col-span-2">
          <h4 className="text-white">Legal</h4>
          <ul className="flex flex-col gap-1">
            <li>
              <Link to="/privacy" className="text-inherit">
                Privacy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-inherit">
                Terms
              </Link>
            </li>
            <li>
              <Link to="/policies" className="text-inherit">
                Policy
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-5 col-span-3">
          <h4 className="text-white">Latest Blog</h4>
          <ul className="flex flex-col gap-1">
            <li>
              <p>No blogs available currently. Please check again later.</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-700">
        <div className="container flex justify-between py-5">
          <ul className="flex items-center gap-6">
            <li>
              <Link to="/privacy" className="text-inherit">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/legal" className="text-inherit">
                Legal Notice
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-inherit">
                Terms of Services
              </Link>
            </li>
          </ul>
          <p className="text-slate-500">&copy; 2025 Algowars</p>
        </div>
      </div>
    </footer>
  );
};
