import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Pager } from "./pager";
import { usePagination } from "./pagination-context.provider";

type PaginationFooterProps = {
  className?: string;
  totalPages: number;
};
export const PaginationFooter = ({
  className,
  totalPages,
}: PaginationFooterProps) => {
  const { sizeOptions, size, changeSize } = usePagination();
  console.log("SIZE OPTIONS: ", sizeOptions, size);

  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-5 md:flex-row justify-between items-center",
        className
      )}
    >
      <Select
        value={`${size}`}
        onValueChange={(value) => changeSize(Number(value))}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Size" />
        </SelectTrigger>
        <SelectContent>
          {sizeOptions.map((option) => (
            <SelectItem key={option.size} value={`${option.size}`}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Pager totalPages={totalPages} />
    </div>
  );
};
