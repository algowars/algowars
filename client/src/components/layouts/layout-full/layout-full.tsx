import { NavbarFull } from "@/components/navbars/navbar-full/navbar-full";
import { Head } from "@/components/seo";
import AccountVerficiationBanner from "@/features/account/account-verification-banner/account-verfication-banner";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export type LayoutFullProps = {
  children?: ReactNode;
  className?: string;
  parentClassName?: string;
};

export const LayoutFull = ({
  children,
  className,
  parentClassName,
}: LayoutFullProps) => {
  return (
    <>
      <Head title="Algowars" />
      <div
        className={cn(
          "flex flex-col min-h-screen bg-zinc-100 dark:bg-background",
          parentClassName
        )}
      >
        <header>
          <AccountVerficiationBanner />
          <NavbarFull />
        </header>
        <main className={cn("grow", className)}>{children}</main>
      </div>
    </>
  );
};
