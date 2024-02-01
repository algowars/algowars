import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

type Props = {
  error?: { message: string } | null;
  showClose?: boolean;
  className?: string;
  setError?: React.Dispatch<React.SetStateAction<{ message: string } | null>>;
};

function ErrorAlert({ error, className = "" }: Props) {
  if (!error) {
    return null;
  }

  return (
    <Alert variant="destructive" className={className}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{error?.message}</AlertDescription>
    </Alert>
  );
}

export default ErrorAlert;
