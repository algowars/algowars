import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  changeSize: (newSize: string) => void;
  size: number;
};

const ProblemsTableFooterOptions = ({ changeSize, size }: Props) => {
  return (
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
  );
};

export default ProblemsTableFooterOptions;
