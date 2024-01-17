type Props = {
  children?: React.ReactNode;
  padding?: string;
  border?: string;
  bgColor?: string;
  borderRadius?: string;
  className?: string;
  size?: string;
};

const Card = ({
  children,
  padding = "p-5",
  border = "border border-slate-300 dark:border-slate-700",
  borderRadius = "rounded",
  bgColor = "bg-white dark:bg-slate-800 dark:text-white",
  size = "",
  className = "",
}: Props) => {
  return (
    <article
      className={`${padding} ${size} ${border} ${bgColor} ${borderRadius}${
        className && ` ${className}`
      }`}
    >
      {children}
    </article>
  );
};

export default Card;
