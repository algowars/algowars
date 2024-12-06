import { LandingFooter } from "@/components/footers/landing-footer";
import { Navbar } from "@/components/navbars/navbar";
import { Head } from "@/components/seo";
import { Toaster } from "@/components/ui/sonner";
import AccountVerficiationBanner from "@/features/account/account-verification-banner/account-verfication-banner";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export type LayoutProps = {
  children?: ReactNode;
  className?: string;
  isAuthenticated?: boolean;
  hideBanners?: boolean;
};

export const Layout = ({
  children,
  className,
  isAuthenticated,
  hideBanners = false,
}: LayoutProps) => {
  return (
    <>
      <Head title="Algowars" />
      <div
        className={cn("flex flex-col min-h-screen bg-background", className)}
      >
        <header>
          {!hideBanners ? <AccountVerficiationBanner /> : null}
          <Navbar isAuthenticated={isAuthenticated} />
        </header>
        <main className="grow">{children}</main>
        <Toaster />
        <LandingFooter />
      </div>
    </>
  );
};
