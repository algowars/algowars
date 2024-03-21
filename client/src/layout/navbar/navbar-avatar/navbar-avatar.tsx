import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import defaultAvatar from "./default_pfp.png";
import { useAuth0 } from "@auth0/auth0-react";
import AuthLogoutButton from "@/features/auth/auth-logout-button/auth-logout-button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/use-app-selector";

type Props = {
  url?: string;
  className?: string;
  fallback?: string;
};

const NavbarAvatar = ({ url, fallback = defaultAvatar }: Props) => {
  const { user } = useAuth0();
  const { account } = useAppSelector((state) => state.account);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="w-11 h-11 rounded-full">
          <Avatar>
            <AvatarImage src={url} />
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 -ml-32 mt-1 flex flex-col px-2 py-1.5">
        <ul className="border-b pb-1.5">
          <li>
            <Link
              to={`/profile/${account.username}`}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "justify-start text-start w-full flex flex-col gap-1 items-start block h-fit hover:underline underline-offset-2"
              )}
            >
              <h5 className="font-semibold">{user?.name}</h5>
              <p className="text-muted-foreground">@{account.username}</p>
            </Link>
          </li>
        </ul>
        <ul className="border-b py-1.5">
          <li>
            <Link
              to={`/profile/${account.username}`}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "justify-start text-start w-full hover:underline underline-offset-2"
              )}
            >
              Profile
            </Link>
          </li>
        </ul>
        <ul className="pt-1.5">
          <li>
            <AuthLogoutButton
              variant="ghost"
              className="text-start justify-start w-full hover:underline underline-offset-2"
            >
              Log out
            </AuthLogoutButton>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default NavbarAvatar;
