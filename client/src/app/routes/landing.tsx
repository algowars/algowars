import { Container } from "@/components/container";
import { LandingLayout } from "@/components/layouts/landing-layout";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/components/ui/link";

export const LandingRoute = () => {
  return (
    <LandingLayout>
      <section>
        <Container className="flex flex-col items-center pt-20 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl max-w-4xl tracking-light font-bold mb-5">
            Battle and Compete in Fast-Paced Coding Challenges
          </h1>
          <p className="text-muted-foreground text-lg text-center max-w-2xl mb-5">
            Compete in fast-paced coding challenges, sharpening your
            problem-solving skills while racing against time and other coders.
          </p>
          <ul className="flex items-center gap-5">
            <li>
              <Link
                to="/signup"
                className={buttonVariants({ variant: "default" })}
              >
                Get Started
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className={buttonVariants({ variant: "outline" })}
              >
                Join Today
              </Link>
            </li>
          </ul>
        </Container>
      </section>
    </LandingLayout>
  );
};
