import { LoginButton } from "@/components/auth/login-button";
import { SignupButton } from "@/components/auth/signup-button";
import { Container } from "@/components/container";
import { LandingLayout } from "@/components/layouts/landing-layout";
import { DashboardRoute } from "./app/dashboard";
import { useAccount } from "@/features/account/account.provider";

export const LandingRoute = () => {
  const { isLoading, isAuthenticated } = useAccount();

  if (!isLoading && isAuthenticated) {
    return <DashboardRoute />;
  }

  return (
    <LandingLayout>
      <section>
        <Container className="flex flex-col items-center py-20 text-center px-3 lg:px-0">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl max-w-4xl tracking-light font-bold mb-5">
            Battle and Compete in Fast-Paced Coding Challenges
          </h1>
          <p className="text-muted-foreground text-lg text-center max-w-2xl mb-5">
            Compete in fast-paced coding challenges, sharpening your
            problem-solving skills while racing against time and other coders.
          </p>
          <ul className="flex items-center gap-5">
            <li>
              <LoginButton variant="default" className="w-28">
                Get Started
              </LoginButton>
            </li>
            <li>
              <SignupButton variant="outline" className="w-28">
                Join Today
              </SignupButton>
            </li>
          </ul>
        </Container>
      </section>
    </LandingLayout>
  );
};
