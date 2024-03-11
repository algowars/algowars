import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Props = {
  title: string;
  description?: string;
  className?: string;
};

const LoaderAlert = ({ title, description, className = "" }: Props) => {
  return (
    <Alert
      className={`fixed z-[100] top-10 left-1/2 -translate-x-1/2 max-w-fit ${className}`}
    >
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default LoaderAlert;
