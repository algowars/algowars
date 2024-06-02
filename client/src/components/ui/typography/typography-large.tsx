import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const TypographyLarge = ({ children }: Props) => {
  return <div className="text-lg font-semibold">{children}</div>;
};

export default TypographyLarge;
