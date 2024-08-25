import AccountExistBanner from "@/features/account/account-exist-banner/account-exist-banner";
import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  bgColor?: string;
  mainClassName?: string;
  className?: string;
  headerColor?: string;
};

const LayoutLanding = ({
  children,
  mainClassName = "",
  className = "flex flex-col min-h-screen relative",
}: Props) => {
  return (
    <div className={className}>
      <header className="z-50 sticky top-0 bg-background">
        <AccountExistBanner />
        <Navbar />
      </header>

      <main className={`grow ${mainClassName}`}>{children}</main>
      <Footer />
    </div>
  );
};

export default LayoutLanding;
