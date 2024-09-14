import { Container } from "@/components/container";
import { Logo } from "@/components/logos/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/components/ui/link";

export const LandingFooter = () => {
  return (
    <footer className="bg-foreground">
      <Container className="py-10 grid grid-cols-12 gap-5">
        <div className="col-span-4 flex flex-col gap-5">
          <Logo className="text-background" />
          <p className="text-muted">Online coding competitions.</p>
          <ul className="text-muted flex items-center gap-5">
            <li>
              <a
                href="https://github.com/algowars/algowars"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background flex justify-center items-center w-8 h-8 rounded-full text-primary"
              >
                <i className="fa-brands fa-github"></i>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/algowars/algowars"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background flex justify-center items-center w-8 h-8 rounded-full text-primary"
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="col-span-2 flex flex-col gap-5">
          <h4 className="text-background font-semibold">Resources</h4>
          <ul className="text-muted flex flex-col gap-2">
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/contact">FAQ</Link>
            </li>
            <li>
              <Link to="/doc">Docs</Link>
            </li>
            <li>
              <Link to="/doc">Support</Link>
            </li>
          </ul>
        </div>
        <div className="col-span-2 flex flex-col gap-5">
          <h4 className="text-background font-semibold">Company</h4>
          <ul className="text-muted flex flex-col gap-2">
            <li>
              <Link to="/contact">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Blog</Link>
            </li>
            <li>
              <Link to="/contact">Creators</Link>
            </li>
            <li>
              <Link to="/contact">Tools</Link>
            </li>
          </ul>
        </div>
        <div className="col-span-4 flex flex-col gap-5">
          <p className="text-muted font-semibold">
            Subscribe to our newsletter
          </p>
          <Input
            placeholder="Enter your email address"
            className="border-muted-foreground"
          />
          <div>
            <Button variant={"secondary"} className="w-28">
              Sign up
            </Button>
          </div>
        </div>
      </Container>
      <div className="border-t border-muted-foreground">
        <Container className="py-5 flex items-center gap-5">
          <p className="text-muted text-sm font-semibold">&copy; Algowars</p>
          <a
            href="https://github.com/algowars/algowars"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted ml-auto"
          ></a>
        </Container>
      </div>
    </footer>
  );
};
