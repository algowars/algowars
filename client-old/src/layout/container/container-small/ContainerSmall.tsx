type Props = {
  children?: React.ReactNode;
  className?: string;
};

const ContainerSmall = ({ children, className = "" }: Props) => {
  return (
    <div className={`${className && className + " "}max-w-5xl mx-auto`}>
      {children}
    </div>
  );
};

export default ContainerSmall;
