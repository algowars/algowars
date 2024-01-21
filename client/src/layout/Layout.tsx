import { ReactNode } from "react";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";

type Props = {
  children?: ReactNode;
  bgColor?: string;
  mainClassName?: string;
  headerColor?: string;
};

const Layout = ({
  children,
  bgColor = "dark:bg-slate-950 dark:text-white",
  mainClassName = "",
}: Props) => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <header className={`py-9 ${bgColor}`}>
        <Navbar />
      </header>

      <main className={`grow ${bgColor} ${mainClassName}`}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
