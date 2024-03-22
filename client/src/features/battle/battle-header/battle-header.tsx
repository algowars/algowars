import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Container from "@/layout/container/container";
import { Link } from "react-router-dom";

const BattleHeader = () => {
  return (
    <div className="relative min-h-[40vh] overflow-hidden">
      <Container className="py-6 z-[100]">
        <Card className="p-5 flex flex-col gap-5">
          <div>
            <h2 className="text-3xl font-bold">Code Battle</h2>
            <p className="text-muted-foreground">
              Compete against other developers in multiple algorithm challenges
            </p>
          </div>
          <div className="flex gap-5 items-center">
            <Link
              to="lobbies"
              className={buttonVariants({ variant: "default" })}
            >
              View lobbies
            </Link>
            <Link
              to="create-lobby"
              className={buttonVariants({ variant: "outline" })}
            >
              Create Lobby
            </Link>
          </div>
        </Card>
      </Container>
      <div className="absolute bottom-[19%] left-[19%] w-32 h-32 rounded-full bg-gradient-to-bl from-muted to-accent/90 dark:from-accent dark:to-accent/20 -z-50"></div>
      <div className="absolute -top-[50%] right-[19%] w-64 h-64 rounded-full bg-gradient-to-bl from-muted to-accent/90 dark:from-accent dark:to-accent/20 -z-50"></div>
      {/* <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -z-50"
        aria-hidden="true"
      >
        <svg
          width="1360"
          height="578"
          viewBox="0 0 1360 578"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="illustration-01"
            >
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="155" cy="443" r="64" />
          </g>
        </svg>
      </div> */}
    </div>
  );
};

export default BattleHeader;
