import { useState } from "react";
import ProblemsTableOptions from "./problems-table-options/problems-table-options";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { problemService } from "@/features/problem/services/problem.service";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useSearchParams } from "react-router-dom";
import ProblemsTablePagination from "./problems-table-pagination/problems-table-pagination";
import ErrorAlert from "@/errors/error-alert/error-alert";

const ProblemsTable = () => {
  const [searchParams] = useSearchParams();

  const page = +(searchParams.get("page") ?? 1);
  const [size, setSize] = useState<number>(50);
  const [timestamp] = useState<Date>(new Date());

  const changeSize = (newSize: string) => {
    setSize(+newSize);
  };

  const { error, data: problemPagination } = useQuery({
    queryKey: ["problems", page, size, timestamp],
    queryFn: () => problemService.getProblemsPageable(page, size, timestamp),
  });

  const isEnd = problemPagination?.totalPages === problemPagination?.page;

  return (
    <div className="flex flex-col gap-5">
      <ProblemsTableOptions />
      <ErrorAlert error={error} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Rating</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {problemPagination?.results.map((problem) => (
            <TableRow key={problem.id}>
              <TableCell className="font-semibold">
                <Link
                  to={`/problems/${problem.slug}`}
                  className="hover:underline underline-offset-2"
                >
                  {problem.title}
                </Link>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {problem?.rating ?? "No Rating"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between">
        <Select onValueChange={changeSize} value={`${size}`}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder={`${size} / page`} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="20">20 / page</SelectItem>
            <SelectItem value="50">50 / page</SelectItem>
            <SelectItem value="100">100 / page</SelectItem>
          </SelectContent>
        </Select>
        <ProblemsTablePagination
          isEnd={isEnd}
          totalPages={problemPagination?.totalPages ?? 1}
        />
      </div>
    </div>
  );
};

export default ProblemsTable;
