import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const TypographyH2 = ({ children }: Props) => {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  );
};

export default TypographyH2;
