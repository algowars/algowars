import { cn } from "@/lib/utils";
import logo192 from "/logo192.png";

export type LogoProps = {
  imgClassName?: string;
};

export const Logo = ({ imgClassName }: LogoProps) => {
  return (
    <span className="flex items-center">
      <img src={logo192} className={cn("h-8 mr-2", imgClassName)} />
      <h1 className="text-xl font-semibold">Algowars</h1>
    </span>
  );
};
