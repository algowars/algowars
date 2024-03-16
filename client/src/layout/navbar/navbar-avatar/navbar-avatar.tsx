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

type Props = {
  url?: string;
  className?: string;
  fallback?: string;
};

const NavbarAvatar = ({ url, fallback = defaultAvatar }: Props) => {
  const { user } = useAuth0();
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
      <PopoverContent className="w-64 -ml-[30%] mt-1 flex flex-col gap-3">
        <Link
          to={`/profile`}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "justify-start text-start"
          )}
        >
          <h5>{user?.name}</h5>
        </Link>
        <AuthLogoutButton variant="ghost" className="text-start justify-start">
          Log out
        </AuthLogoutButton>
      </PopoverContent>
    </Popover>
  );
};

export default NavbarAvatar;
