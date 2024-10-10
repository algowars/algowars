import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "../ui/pagination";
import { usePagination } from "./pagination-context.provider";

type PagerProps = {
  totalPages: number;
};

export const Pager = ({ totalPages }: PagerProps) => {
  const { page, changePage } = usePagination();
  const pagesEndDiff = totalPages ?? 0 - page;

  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              variant={"ghost"}
              disabled={page <= 1}
              onClick={() => changePage(page - 1)}
            >
              <ChevronLeftIcon className="h-4 w-4" />
              <span>Previous</span>
            </Button>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>{page}</PaginationLink>
          </PaginationItem>
          {pagesEndDiff > 1 ? (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          ) : null}
          <PaginationItem>
            <Button
              variant={"ghost"}
              disabled={page >= totalPages}
              onClick={() => changePage(page + 1)}
            >
              <span>Next</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
