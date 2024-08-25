import { ReactNode } from "react";
import Navbar from "./navbar/navbar";
import Footer from "./footer/footer";
import AccountExistBanner from "@/features/account/account-exist-banner/account-exist-banner";

type Props = {
  children?: ReactNode;
  bgColor?: string;
  mainClassName?: string;
  className?: string;
  headerColor?: string;
  hideAccountExistBanner?: boolean;
};

const Layout = ({
  children,
  mainClassName = "",
  className = "flex flex-col min-h-screen relative",
  hideAccountExistBanner = false,
}: Props) => {
  return (
    <div className={className}>
      <header className="z-50 sticky top-0 bg-background">
        {!hideAccountExistBanner ? <AccountExistBanner /> : null}
        <Navbar />
      </header>

      <main className={`grow ${mainClassName}`}>{children}</main>
      <Footer />
    </div>
  );
};
export default Layout;
