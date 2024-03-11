import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

type Props = {
  error?: { message: string } | null;
  className?: string;
};

const ErrorAlertFixed = ({ error, className = "" }: Props) => {
  if (!error) {
    return null;
  }

  return (
    <Alert
      variant="destructive"
      className={`fixed top-5 left-1/2 max-w-fit -translate-x-1/2 z-50 bg-white bg-background ${className}`}
    >
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{error?.message}</AlertDescription>
    </Alert>
  );
};

export default ErrorAlertFixed;
