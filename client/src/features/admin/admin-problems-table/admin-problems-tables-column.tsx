import { ColumnDef } from "@tanstack/react-table";
import { DifficultyBadge } from "@/components/difficulty-badge/difficulty-badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Problem } from "@/features/problem/models/problem.model";
import { formatDateWithYear } from "@/utils/format-date";

export const columns: ColumnDef<Problem>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "tags",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tags
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const tags = row.getValue("tags") as string[];
      return <span className="text-muted-foreground">{tags.join(", ")}</span>;
    },
  },
  {
    accessorKey: "difficulty",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Difficulty
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <DifficultyBadge difficulty={row.getValue("difficulty")} />;
    },
  },
  {
    accessorKey: "slug",
    header: "Slug",
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="text-muted-foreground">
          {formatDateWithYear(row.getValue("createdAt"))}
        </span>
      );
    },
  },
];
