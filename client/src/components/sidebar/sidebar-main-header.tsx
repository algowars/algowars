import { Fragment, ReactNode } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "../theme/mode-toggle";
import { Link } from "react-router-dom";

type SidebarMainHeaderProps = {
  children?: ReactNode;
  breadcrumbs: {
    href: string;
    name: string;
  }[];
};

export const SidebarMainHeader = ({
  children = (
    <ul className="ml-auto mr-3">
      <li>
        <ModeToggle />
      </li>
    </ul>
  ),
  breadcrumbs = [],
}: SidebarMainHeaderProps) => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb, index) => {
              if (breadcrumbs.length - 1 === index) {
                return (
                  <BreadcrumbItem key={breadcrumb.href}>
                    <BreadcrumbPage>{breadcrumb.name}</BreadcrumbPage>
                  </BreadcrumbItem>
                );
              }

              return (
                <Fragment key={breadcrumb.href + breadcrumb.name}>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href={breadcrumb.href} asChild>
                      <Link to={breadcrumb.href}>{breadcrumb.name}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {children}
    </header>
  );
};
