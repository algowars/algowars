import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
};

const TypographyH4 = ({ children, className }: Props) => {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h4>
  );
};

export default TypographyH4;
