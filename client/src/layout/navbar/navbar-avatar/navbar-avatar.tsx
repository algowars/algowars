import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import defaultAvatar from "./default_pfp.png";
import { useAuth0 } from "@auth0/auth0-react";
import AuthLogoutButton from "@/features/auth/auth-logout-button/auth-logout-button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/use-app-selector";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  url?: string;
  className?: string;
  fallback?: string;
};

const NavbarAvatar = ({ url, fallback = defaultAvatar }: Props) => {
  const { user } = useAuth0();
  const { account } = useAppSelector((state) => state.account);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-11 h-11 rounded-full">
          <Avatar className="w-8 h-8 p-0">
            <AvatarImage src={url} />
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuItem asChild>
          <Link
            to={`/profile/${account?.player?.username}`}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "text-start w-full flex flex-col gap-1 items-start block h-fit"
            )}
            style={{ alignItems: "start" }}
          >
            <h5 className="font-semibold">{user?.name}</h5>
            {account?.player?.username ? (
              <p className="text-muted-foreground">
                @{account?.player?.username}
              </p>
            ) : null}
          </Link>
        </DropdownMenuItem>
        <ul className="border-t border-b my-1 py-1 flex flex-col  gap-1">
          <li>
            <DropdownMenuItem asChild>
              <Link
                to={`/profile/${account?.player?.username}`}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "justify-start text-start w-full"
                )}
              >
                Profile
              </Link>
            </DropdownMenuItem>
          </li>
          <li>
            <DropdownMenuItem className="p-0" asChild>
              <Link
                to="/settings"
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "justify-start text-start w-full"
                )}
              >
                Settings
              </Link>
            </DropdownMenuItem>
          </li>
        </ul>
        <DropdownMenuItem asChild>
          <AuthLogoutButton
            variant="ghost"
            className="text-start justify-start w-full"
          >
            Log out
          </AuthLogoutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarAvatar;
