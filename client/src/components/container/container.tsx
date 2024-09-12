import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export type ContainerProps = {
  children?: ReactNode;
  className?: string;
};

export const Container = ({
  children,
  className,
  ...props
}: ContainerProps) => {
  return (
    <div className={cn("max-w-6xl mx-auto", className)} {...props}>
      {children}
    </div>
  );
};
