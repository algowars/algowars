import { Navbar } from "@/components/navbars/navbar";
import { Head } from "@/components/seo";
import { ReactNode } from "react";

export type LayoutProps = {
  children?: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head title="Algowars" />
      <div className="flex flex-col min-h-screen">
        <header>
          <Navbar />
        </header>
        <main className="grow">{children}</main>
      </div>
    </>
  );
};