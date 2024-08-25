import { ReactNode } from "react";
import AccountExistBanner from "@/features/account/account-exist-banner/account-exist-banner";
import LayoutProblemNavbar from "./layout-problem-navbar/layout-problem-navbar";

type Props = {
  children?: ReactNode;
  bgColor?: string;
  mainClassName?: string;
  className?: string;
  headerColor?: string;
  hideAccountExistBanner?: boolean;
};

const LayoutProblem = ({
  children,
  mainClassName = "",
  className = "flex flex-col h-screen relative",
  hideAccountExistBanner = false,
}: Props) => {
  return (
    <div className={className}>
      <header className="z-50 sticky top-0">
        {!hideAccountExistBanner ? <AccountExistBanner /> : null}
        <LayoutProblemNavbar />
      </header>

      <main className={`grow ${mainClassName}`}>{children}</main>
    </div>
  );
};
export default LayoutProblem;
