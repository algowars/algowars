import { routerConfig } from "@/app/router-config";
import { Link } from "../ui/link";
import logo192 from "/logo192.png";

export const SidebarLogo = () => {
  return (
    <Link to={routerConfig.root.path} className="flex items-center">
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
        <img src={logo192} className="h-8" alt="Algowars" />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight ml-2">
        <span className="truncate font-semibold">Algowars</span>
      </div>
    </Link>
  );
};
