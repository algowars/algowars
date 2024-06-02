import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
};

const TypographyMuted = ({ children, className = "" }: Props) => {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
  );
};

export default TypographyMuted;
