type Props = {
  children: React.ReactNode;
  className?: string;
};

const Container = ({ children, className = "" }: Props) => {
  return (
    <div className={`${className && className + " "}max-w-7xl mx-auto`}>
      {children}
    </div>
  );
};

export default Container;
