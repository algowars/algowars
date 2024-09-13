import { Container } from "@/components/container";
import { Logo } from "@/components/logos/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/components/ui/link";

export type LandingFooterProps = {};

export const LandingFooter = (props: LandingFooterProps) => {
  return (
    <footer className="bg-primary">
      <Container className="text-muted-foreground p-10 grid grid-cols-12 gap-5">
        <div className="col-span-4 flex flex-col gap-5">
          <Logo className="text-muted" />
          <p>Online coding competitions.</p>
        </div>
        <div className="col-span-2 flex flex-col gap-5">
          <h4 className="text-muted font-semibold">Support</h4>
          <ul>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/contact">FAQ</Link>
            </li>
          </ul>
        </div>
        <div className="col-span-2 flex flex-col gap-5">
          <h4 className="text-muted font-semibold">Support</h4>
          <ul>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/contact">FAQ</Link>
            </li>
          </ul>
        </div>
        <div className="col-span-4 flex flex-col gap-5">
          <p className="text-muted font-semibold">
            Subscribe to our newsletter
          </p>
          <Input placeholder="Enter your email address" />
          <div>
            <Button variant={"secondary"} className="w-28">
              Sign up
            </Button>
          </div>
        </div>
      </Container>
    </footer>
  );
};
