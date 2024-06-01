import { useEffect } from "react";
import Footer from "../footer/footer";
import LandingHeader from "./landing-header/landing-header";
import LandingHero from "./landing-hero/landing-hero";
import { useTheme } from "@/features/theme/theme.provider";

const Landing = () => {
  const { setTheme } = useTheme();
  useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  return (
    <div className="font-inter antialiased bg-white text-gray-900 tracking-light">
      <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
        <LandingHeader />
        <main>
          <LandingHero />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
