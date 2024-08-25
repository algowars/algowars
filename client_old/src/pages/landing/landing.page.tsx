import LandingHero from "@/features/landing/landing-hero/landing-hero";
import LayoutLanding from "@/layout/layout-landing/layout-landing";

const LandingPage = () => {
  return (
    <LayoutLanding>
      <section>
        <LandingHero />
      </section>
    </LayoutLanding>
  );
};

export default LandingPage;
