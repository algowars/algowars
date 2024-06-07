import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import { useSearchParams } from "react-router-dom";

type Props = {
  isEnd: boolean;
  totalPages: number;
};

const ProblemsTableFooterPagination = ({ isEnd, totalPages }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = +(searchParams.get("page") ?? 1);

  const changePage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams({ page: `${newPage}` });
    }
  };

  return (
    <ul className="flex items-center gap-2">
      <li>
        <Button
          variant="ghost"
          onClick={() => changePage(page - 1)}
          disabled={page === 1}
        >
          <ChevronLeft size={18} className="mr-2" />
          Previous
        </Button>
      </li>
      {page - 1 > 1 ? (
        <>
          <li>
            <Button variant="ghost" onClick={() => changePage(1)}>
              1
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="w-10 px-0" disabled={true}>
              <Ellipsis size={16} />
            </Button>
          </li>
        </>
      ) : null}
      {page > 2 ? (
        <li>
          <Button variant="ghost" onClick={() => changePage(page - 2)}>
            {page - 2}
          </Button>
        </li>
      ) : null}
      {page > 1 ? (
        <li>
          <Button variant="ghost" onClick={() => changePage(page - 1)}>
            {page - 1}
          </Button>
        </li>
      ) : null}
      <li>
        <Button variant="outline" className="font-semibold">
          {page}
        </Button>
      </li>
      {!isEnd && page + 1 <= totalPages ? (
        <li>
          <Button variant="ghost" onClick={() => changePage(page + 1)}>
            {page + 1}
          </Button>
        </li>
      ) : null}
      {!isEnd && page + 2 <= totalPages && page === 1 ? (
        <>
          <li>
            <Button variant="ghost" onClick={() => changePage(page + 2)}>
              {page + 2}
            </Button>
          </li>
        </>
      ) : null}

      {page <= totalPages - 2 ? (
        <>
          <li>
            <Button variant="ghost" className="w-10 px-0" disabled={true}>
              <Ellipsis size={16} />
            </Button>
          </li>
          <li>
            <Button variant="ghost" onClick={() => changePage(totalPages)}>
              {totalPages}
            </Button>
          </li>
        </>
      ) : null}
      <li>
        <Button
          variant="ghost"
          onClick={() => changePage(page + 1)}
          disabled={isEnd}
        >
          Next
          <ChevronRight size={18} className="ml-2" />
        </Button>
      </li>
    </ul>
  );
};

export default ProblemsTableFooterPagination;
