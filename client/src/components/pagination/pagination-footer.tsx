import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { usePagination } from "./pagination-context.provider";

export const PaginationFooter = () => {
  const { sizeOptions } = usePagination();
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Size" />
      </SelectTrigger>
      <SelectContent>
        {sizeOptions.map((option) => (
          <SelectItem value={`${option.size}`}>{option.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
