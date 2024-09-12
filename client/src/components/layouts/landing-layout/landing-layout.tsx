import { LandingNavbar } from "@/components/navbars/landing-navbar";
import { Head } from "@/components/seo";
import { ReactNode } from "react";

export type LandingLayoutProps = {
  children?: ReactNode;
};

export const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <>
      <Head title="Algowars" />
      <div className="flex flex-col min-h-screen">
        <header>
          <LandingNavbar />
        </header>
        <main className="grow">{children}</main>
      </div>
    </>
  );
};
