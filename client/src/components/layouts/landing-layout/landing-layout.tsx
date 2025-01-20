import { LandingFooter } from "@/components/footers/landing-footer";
import { LandingNavbar } from "@/components/navbars/landing-navbar";
import { Head } from "@/components/seo";
import AccountVerficiationBanner from "@/features/account/account-verification-banner/account-verfication-banner";
import { ReactNode } from "react";

export type LandingLayoutProps = {
  children?: ReactNode;
};

export const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <>
      <Head title="Algowars" />
      <div className="flex flex-col min-h-screen bg-background">
        <header>
          <AccountVerficiationBanner />
          <LandingNavbar />
        </header>
        <main className="grow">{children}</main>
        <LandingFooter />
      </div>
    </>
  );
};
