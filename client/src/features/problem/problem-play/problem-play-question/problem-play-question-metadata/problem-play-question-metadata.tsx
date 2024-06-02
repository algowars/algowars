import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TypographyH4 from "@/components/ui/typography/typography-h4";
import TypographyMuted from "@/components/ui/typography/typography-muted";
import { Role } from "@/features/auth/auth-roles/role";
import { ProblemAggregate } from "@/features/problem/problem-aggregate.model";
import { useAppSelector } from "@/store/use-app-selector";
import { Ellipsis } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  problemAggregate: ProblemAggregate;
};

const ProblemPlayQuestionMetadata = ({ problemAggregate }: Props) => {
  const { roles } = useAppSelector((state) => state.roles);

  const isAdmin = roles.includes(Role.ADMIN);

  return (
    <header className="flex flex-col gap-3">
      <div className="flex gap-3 items-center justify-between">
        <TypographyH4>
          {problemAggregate.problem.id}. {problemAggregate.problem.title}
        </TypographyH4>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-0 w-8 h-8">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuGroup>
              <DropdownMenuItem>Report</DropdownMenuItem>
              {isAdmin ? (
                <DropdownMenuItem asChild>
                  <Link
                    to={`/admin/edit/problem/${problemAggregate.problem.slug}`}
                  >
                    Edit Problem
                  </Link>
                </DropdownMenuItem>
              ) : null}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ul>
        <li>
          <TypographyMuted>
            Rating: {problemAggregate.problem.rating ?? "No rating"}
          </TypographyMuted>
        </li>
      </ul>
    </header>
  );
};

export default ProblemPlayQuestionMetadata;
