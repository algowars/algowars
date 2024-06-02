import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
};

const TypographyH2 = ({ children, className }: Props) => {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
    >
      {children}
    </h2>
  );
};

export default TypographyH2;
