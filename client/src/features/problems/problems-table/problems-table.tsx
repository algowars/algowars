import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProblemService } from "@/features/problem/services/problem.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ProblemsTableFooter from "./problems-table-footer/problems-table-footer";
import { toast } from "sonner";
const ProblemsTable = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = +(searchParams.get("page") ?? 1);
  const [size, setSize] = useState<number>(50);
  const [timestamp] = useState<Date>(new Date());

  const changeSize = (newSize: string) => {
    setSize(+newSize);
  };

  const { error, data: problemPagination } = useQuery({
    queryKey: ["problems", page, size, timestamp],
    queryFn: () =>
      ProblemService.getInstance().getPageable(page, size, timestamp),
  });

  const isEnd = problemPagination?.totalPages === problemPagination?.page;

  useEffect(() => {
    if (error?.message) {
      toast("Error getting problems", {
        description: error.message,
      });
    }
  }, [error?.message]);

  return (
    <div className="flex flex-col gap-5">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {problemPagination?.results.map((problem) => (
            <TableRow
              key={problem.id}
              onDoubleClick={() =>
                navigate(`/problem/${encodeURIComponent(problem.slug)}`)
              }
            >
              <TableCell>{problem.title}</TableCell>
              <TableCell>{problem.rating}</TableCell>
              <TableCell>
                <Link
                  to={`/problem/${encodeURIComponent(problem.slug)}`}
                  className={buttonVariants({ variant: "default" })}
                >
                  View
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ProblemsTableFooter
        changeSize={changeSize}
        size={size}
        isEnd={isEnd}
        totalPages={problemPagination?.totalPages ?? 0}
      />
    </div>
  );
};

export default ProblemsTable;
