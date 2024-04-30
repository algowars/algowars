import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const TypographyMuted = ({ children }: Props) => {
  return <p className="text-sm text-muted-foreground">{children}</p>;
};

export default TypographyMuted;
