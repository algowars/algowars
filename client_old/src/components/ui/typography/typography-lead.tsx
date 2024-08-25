import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const TypographyLead = ({ children }: Props) => {
  return <p className="text-xl text-muted-foreground">{children}</p>;
};

export default TypographyLead;
