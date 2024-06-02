import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className="h-screen flex justify-center items-center">
      <div className="flex flex-col items-center gap-8">
        <h1 className="scroll-m-20 text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight lg:text-7xl mb-4 md:mb-7">
          Looks like you&apos;re lost.
        </h1>
        <Link
          to="/"
          className={cn(buttonVariants({ variant: "default" }), "w-28")}
        >
          Back Home
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
