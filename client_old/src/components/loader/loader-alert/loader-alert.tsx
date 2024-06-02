import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Props = {
  title: string;
  description?: string;
  className?: string;
  isLoading: boolean;
};

const LoaderAlert = ({
  title,
  description,
  className = "",
  isLoading,
}: Props) => {
  if (!isLoading) {
    return null;
  }
  return (
    <Alert
      className={`fixed z-50 top-10 left-1/2 -translate-x-1/2 max-w-fit ${className}`}
    >
      <AlertTitle className="font-semibold">{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default LoaderAlert;
