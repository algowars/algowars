import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export type LayoutProps = {
  children?: ReactNode;
  className?: string;
};

export const Layout = ({ children, className, ...props }: LayoutProps) => {
  return (
    <div className={cn("max-w-4xl mx-auto", className)} {...props}>
      {children}
    </div>
  );
};
