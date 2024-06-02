import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
};

const TypographyH3 = ({ children, className }: Props) => {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h3>
  );
};

export default TypographyH3;
