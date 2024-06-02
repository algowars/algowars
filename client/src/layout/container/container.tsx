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
  return (
    <div className={`${className && className + " "}${width} mx-auto`}>
      {children}
    </div>
  );
};

export default Container;
