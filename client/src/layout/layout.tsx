import { ReactNode } from "react";
import Navbar from "./navbar/navbar";
import Footer from "./footer/footer";
import { NavLink } from "./navbar/nav-link";
import AuthLoginButton from "@/features/auth/auth-login-button/auth-login-button";
import AuthSignupButton from "@/features/auth/auth-signup-button/auth-signup-button";
import { useAuth0 } from "@auth0/auth0-react";
import { authNavLinks } from "@/features/auth/auth-nav";
type Props = {
  children?: ReactNode;
  bgColor?: string;
  mainClassName?: string;
  headerColor?: string;
};

const Layout = ({ children, bgColor = "", mainClassName = "" }: Props) => {
  const { isAuthenticated } = useAuth0();
  console.log(isAuthenticated);
  const navLinks: NavLink[] = isAuthenticated
    ? authNavLinks
    : [
        {
          name: "log in",
          element: <AuthLoginButton variant="outline">Log in</AuthLoginButton>,
        },
        {
          name: "sign up",
          element: (
            <AuthSignupButton variant="default">Sign up</AuthSignupButton>
          ),
        },
      ];

  return (
    <div className="flex flex-col min-h-screen relative">
      <header className={`${bgColor}`}>
        <Navbar navLinks={navLinks} />
      </header>

      <main className={`grow ${bgColor} ${mainClassName}`}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
