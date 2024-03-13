import { ReactNode } from "react";
import Navbar from "./navbar/navbar";
import Footer from "./footer/footer";
import { NavLink } from "./navbar/nav-link";
import AuthLoginButton from "@/features/auth/auth-login-button/auth-login-button";
import AuthSignupButton from "@/features/auth/auth-signup-button/auth-signup-button";
import { useAuth0 } from "@auth0/auth0-react";
import { buttonVariants } from "@/components/ui/button";
import AuthLogoutButton from "@/features/auth/auth-logout-button/auth-logout-button";
import ThemeToggle from "@/features/theme/theme-toggle/theme-toggle";
import { useNavbar } from "./navbar/use-navbar";

type Props = {
  children?: ReactNode;
  bgColor?: string;
  mainClassName?: string;
  headerColor?: string;
};

const Layout = ({ children, bgColor = "", mainClassName = "" }: Props) => {
  const { links } = useNavbar();
  return (
    <div className="flex flex-col min-h-screen relative">
      <header className={`${bgColor}`}>
        <Navbar navLinks={links} />
      </header>

      <main className={`grow ${bgColor} ${mainClassName}`}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
