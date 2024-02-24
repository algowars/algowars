import { ReactNode } from "react";
import NavbarSolid from "../navbar/navbar-solid/NavbarSolid";
import Footer from "../footer/Footer";

type Props = {
  children?: ReactNode;
  bgColor?: string;
  mainClassName?: string;
  headerColor?: string;
  mainClassSize?: string;
  showFooter?: boolean;
};

const LayoutSolid = ({
  children,
  bgColor = "dark:bg-stone-950 dark:text-white",
  mainClassName = "",
  mainClassSize = "grow",
  showFooter = true,
}: Props) => {
  return (
    <div className="flex flex-col max-h-screen relative">
      <header className={bgColor}>
        <NavbarSolid />
      </header>

      <main className={`${mainClassSize} ${bgColor} ${mainClassName}`}>
        {children}
      </main>
      {showFooter ? <Footer /> : null}
    </div>
  );
};

export default LayoutSolid;
