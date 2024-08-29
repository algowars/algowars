import { useNavigate } from 'react-router';

import logo from '@/assets/logo.svg';
import { Head } from '@/components/seo';
import { Button, buttonVariants } from '@/components/ui/button';
import { useUser } from '@/lib/auth';
import { LandingNavbar } from '@/components/navbars/landing-navbar';
import { Link } from '@/components/ui/link';
import { LandingFooter } from '@/components/footers/landing-footer';

export const LandingRoute = () => {
  const navigate = useNavigate();
  const user = useUser();

  const handleStart = () => {
    if (user.data) {
      navigate('/app');
    } else {
      navigate('/auth/login');
    }
  };

  return (
    <>
      <Head description="Welcome to Algowars" />
      <header>
        <LandingNavbar />
      </header>
      <main className="flex flex-col h-screen items-center">
        <div className="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
          <div className="backdrop-blur relative h-full z-10">
            <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center">
              Unleash Your Coding Power in the Ultimate Developer Showdown
            </h1>
            <p className="mt-6 text-lg text-slate-600 text-center max-w-3xl mx-auto">
              Join a global arena where speed, skill, and strategy define the
              best developers. Compete, conquer, and rise to the top of the
              leaderboard!
            </p>
            <ul className="flex items-center gap-5 justify-center mt-7">
              <li>
                <Link
                  to="/login"
                  className={buttonVariants({ variant: 'default' })}
                >
                  Get started
                </Link>
              </li>
              <li>
                <Link
                  to="/sign-up"
                  className={buttonVariants({ variant: 'secondary' })}
                >
                  Join today
                </Link>
              </li>
            </ul>
          </div>

          <div className="animate-pulse-slow delay absolute w-64 h-64 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 absolute blur top-12 right-0"></div>
          <div className="animate-pulse-slow absolute w-64 h-64 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 absolute blur bottom-0 left-0"></div>
        </div>
      </main>
      <LandingFooter />
    </>
  );
};
