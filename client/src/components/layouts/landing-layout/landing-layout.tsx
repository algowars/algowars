import { LandingFooter } from "@/components/footers/landing-footer";
import { LandingNavbar } from "@/components/navbars/landing-navbar";
import { Head } from "@/components/seo";
import { ReactNode } from "react";

export type LandingLayoutProps = {
  children?: ReactNode;
  isAuthenticated?: boolean;
};

export const LandingLayout = ({
  children,
  isAuthenticated,
}: LandingLayoutProps) => {
  return (
    <>
      <Head title="Algowars" />
      <div className="flex flex-col min-h-screen bg-background">
        <header>
          <LandingNavbar isAuthenticated={isAuthenticated} />
        </header>
        <main className="grow">{children}</main>
        <LandingFooter />
      </div>
    </>
  );
};
