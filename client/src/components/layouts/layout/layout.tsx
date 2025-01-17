import { LandingFooter } from "@/components/footers/landing-footer";
import { Navbar } from "@/components/navbars/navbar";
import { Head } from "@/components/seo";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export type LayoutProps = {
  children?: ReactNode;
  className?: string;
};

export const Layout = ({ children, className }: LayoutProps) => {
  return (
    <>
      <Head title="Algowars" />
      <div
        className={cn("flex flex-col min-h-screen bg-background", className)}
      >
        <header>
          <Navbar />
        </header>
        <main className="grow">{children}</main>
        <Toaster />
        <LandingFooter />
      </div>
    </>
  );
};
