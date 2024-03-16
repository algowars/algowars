import Footer from "../footer/footer";
import LandingHeader from "./landing-header/landing-header";
import LandingHero from "./landing-hero/landing-hero";

const Landing = () => {
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
