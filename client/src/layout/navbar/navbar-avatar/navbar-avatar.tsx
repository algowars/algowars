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
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthLogoutButton } from "@/features/auth/auth-logout-button/auth-logout-button.hooks";

type Props = {
  url?: string;
  className?: string;
  fallback?: string;
};

const NavbarAvatar = ({ url, fallback = defaultAvatar }: Props) => {
  const { user } = useAuth0();
  const { account } = useAppSelector((state) => state.account);

  const { handleLogout } = useAuthLogoutButton();

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
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link
              to={`/profile/${account?.username}`}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "text-start w-full flex flex-col gap-1 items-start block h-fit"
              )}
              style={{ alignItems: "start" }}
            >
              <h5 className="font-semibold">{user?.name}</h5>
              {account?.username ? (
                <p className="text-muted-foreground">@{account?.username}</p>
              ) : null}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link
              to={`/profile/${account?.username}`}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "justify-start text-start w-full"
              )}
            >
              Profile
            </Link>
          </DropdownMenuItem>{" "}
          <DropdownMenuItem asChild>
            <Link
              to="/documentation"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "justify-start text-start w-full"
              )}
            >
              Docs
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
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
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link
              to="/logout"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "justify-start text-start w-full"
              )}
            >
              Log out
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarAvatar;
