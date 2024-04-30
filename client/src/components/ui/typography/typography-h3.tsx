import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const TypographyH3 = ({ children }: Props) => {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  );
};

export default TypographyH3;
