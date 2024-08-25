import { landingHero } from "../landing.config";
import Container from "@/layout/container/container";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const LandingHero = () => {
  return (
    <article className="min-h-[60vh] lg:min-h-[80vh] py-12">
      <Container className="flex flex-col items-center justify-center h-full">
        <div className="max-w-3xl flex flex-col items-center text-center gap-5">
          <h1 className="scroll-m-20 text-3xl md:text-5xl lg:text-7xl font-semibold tracking-tight lg:text-5xl mb-4 md:mb-7">
            {landingHero.title}
          </h1>
          <p className="text-muted-foreground md:max-w-xl lg:max-w-2xl font-semibold">
            {landingHero.body}
          </p>
          <div className="mt-4">
            <Link
              to="/login"
              className={cn(
                buttonVariants({ variant: "default" }),
                "font-semibold h-12 px-8"
              )}
            >
              Get Started
            </Link>
          </div>
        </div>
      </Container>
    </article>
  );
};

export default LandingHero;
