import { NavbarFull } from "@/components/navbars/navbar-full/navbar-full";
import { Head } from "@/components/seo";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export type LayoutFullProps = {
  children?: ReactNode;
  isAuthenticated?: boolean;
  className?: string;
};

export const LayoutFull = ({
  children,
  isAuthenticated,
  className,
}: LayoutFullProps) => {
  return (
    <>
      <Head title="Algowars" />
      <div className="flex flex-col min-h-screen bg-background">
        <header>
          <NavbarFull isAuthenticated={isAuthenticated} />
        </header>
        <main className={cn("grow", className)}>{children}</main>
      </div>
    </>
  );
};
