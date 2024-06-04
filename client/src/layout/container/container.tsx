import { cn } from "@/lib/utils";

type Props = {
  children?: React.ReactNode;
  className?: string;
  width?: string;
};

const Container = ({
  children,
  className = "",
  width = "container",
}: Props) => {
  return <div className={cn(`${width} mx-auto`, className)}>{children}</div>;
};

export default Container;
