import AccountExistBanner from "@/features/account/account-exist-banner/account-exist-banner";
import Navbar from "../navbar/navbar";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  bgColor?: string;
  mainClassName?: string;
  className?: string;
  headerColor?: string;
};

const LayoutFull = ({
  children,
  bgColor = "",
  mainClassName = "",
  className = "flex flex-col h-screen relative",
}: Props) => {
  return (
    <div className={className}>
      <header className={`${bgColor}`}>
        <AccountExistBanner />
        <Navbar width="100%" className="px-3" />
      </header>

      <main className={`grow ${bgColor} ${mainClassName}`}>{children}</main>
    </div>
  );
};

export default LayoutFull;
