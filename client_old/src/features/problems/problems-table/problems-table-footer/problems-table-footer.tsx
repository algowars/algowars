import ProblemsTableFooterOptions from "./problems-table-footer-options/problems-table-footer-options";
import ProblemsTableFooterPagination from "./problems-table-footer-pagination/problems-table-footer-pagination";

type Props = {
  changeSize: (newSize: string) => void;
  size: number;
  isEnd: boolean;
  totalPages: number;
};

const ProblemsTableFooter = ({
  changeSize,
  size,
  isEnd,
  totalPages,
}: Props) => {
  return (
    <footer className="flex justify-between">
      <ProblemsTableFooterOptions changeSize={changeSize} size={size} />
      <ProblemsTableFooterPagination isEnd={isEnd} totalPages={totalPages} />
    </footer>
  );
};

export default ProblemsTableFooter;
