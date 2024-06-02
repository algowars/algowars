import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const TypographySmall = ({ children }: Props) => {
  return <small className="text-sm font-medium leading-none">{children}</small>;
};

export default TypographySmall;
