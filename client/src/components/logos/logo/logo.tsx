import { cn } from "@/lib/utils";
import logo192 from "/logo192.png";
import { Badge } from "@/components/ui/badge";

export type LogoProps = {
  imgClassName?: string;
  className?: string;
};

export const Logo = ({ imgClassName, className }: LogoProps) => {
  return (
    <span className={cn("flex items-center relative", className)}>
      <img src={logo192} className={cn("h-8 mr-2", imgClassName)} />
      <h1 className="text-xl font-semibold">Algowars</h1>
      <Badge className="text-xs px-1.5 py-0.25 absolute -right-12 -top-0">
        Alpha
      </Badge>
    </span>
  );
};
