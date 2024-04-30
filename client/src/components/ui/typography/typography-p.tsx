import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const TypographyH1 = ({ children }: Props) => {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>;
};

export default TypographyH1;
