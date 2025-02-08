import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAdminProblems } from "../admin-create-problem/api/get-admin-problems";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader } from "@/components/loader/loader";
import { DifficultyBadge } from "@/components/difficulty-badge/difficulty-badge";
import { routerConfig } from "@/app/router-config";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pager } from "@/components/pagination";

const pageSizes = [
  {
    size: 20,
    label: "20 / page",
  },
  {
    size: 50,
    label: "50 / page",
  },
  {
    size: 100,
    label: "100 / page",
  },
];

export const AdminProblemsTable = () => {
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(25);
  const [timestamp] = useState<Date>(new Date());

  const adminProblemsQuery = useGetAdminProblems({
    accessToken,
    page,
    size,
    timestamp,
  });

  useEffect(() => {
    (async () => {
      if (!accessToken) {
        const token = await getAccessTokenSilently();
        setAccessToken(token);
      }
    })();
  }, [accessToken, getAccessTokenSilently]);

  const changePage = (newPage: number) => {
    setPage(newPage);
  };

  const changeSize = (newSize: number) => {
    setSize(newSize);
  };

  console.log(adminProblemsQuery.data);

  return (
    <div className="w-full flex flex-col gap-3 overflow-x-auto">
      <Table className="min-w-[37.5rem]">
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Problem Status</TableHead>
          </TableRow>
        </TableHeader>
        {adminProblemsQuery.isPending ? <Loader /> : null}
        {adminProblemsQuery.data?.results.map((problem) => (
          <TableRow
            key={problem.id}
            className="hover:cursor-pointer"
            onClick={() =>
              navigate(routerConfig.adminViewProblem.execute(problem.slug))
            }
          >
            <TableCell>{problem.title}</TableCell>
            <TableCell className="text-muted-foreground">
              {problem.tags?.join(", ")}
            </TableCell>
            <TableCell>
              <DifficultyBadge difficulty={problem.difficulty} />
            </TableCell>
            <TableCell className="text-muted-foreground">
              {problem.status}
            </TableCell>
          </TableRow>
        ))}
      </Table>
      <div
        className={
          "flex flex-col-reverse gap-5 md:flex-row justify-between items-center"
        }
      >
        <Select
          value={`${size}`}
          onValueChange={(value) => changeSize(Number(value))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Size" />
          </SelectTrigger>
          <SelectContent>
            {pageSizes.map((option) => (
              <SelectItem key={option.size} value={`${option.size}`}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Pager totalPages={adminProblemsQuery?.data?.totalPages ?? 0} />
      </div>
    </div>
  );
};
