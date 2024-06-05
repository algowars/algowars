import { ProblemService } from "@/features/problem/services/problem.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
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
    queryFn: () =>
      ProblemService.getInstance().getPageable(page, size, timestamp),
  });

  const isEnd = problemPagination?.totalPages === problemPagination?.page;

  return <div className="flex flex-col gap-5"></div>;
};

export default ProblemsTable;
