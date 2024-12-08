import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

type NavbarMenuProps = {
  className?: string;
};

export const NavbarMenu = ({ className }: NavbarMenuProps) => {
  return (
    <div className={className}>
      <Sheet>
        <SheetTrigger className="p-2">
          <HamburgerMenuIcon />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Algowars</SheetTitle>
          </SheetHeader>
          <ul className="hidden sm:flex items-center gap-5 ml-auto"></ul>
        </SheetContent>
      </Sheet>
    </div>
  );
};
