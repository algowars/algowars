type Props = {
  error?: { message: string } | null;
  showClose?: boolean;
  className?: string;
  setError?: React.Dispatch<React.SetStateAction<{ message: string } | null>>;
};

function ErrorAlert({
  error,
  className = "",
  showClose,
  setError = () => {},
}: Props) {
  return (
    error &&
    error.message && (
      <div
        className={`${
          showClose ? "pl-3 pr-1 py-2" : "p-3"
        } bg-red-200 dark:bg-red-400 dark:text-red-800 border rounded border-red-700 text-red-700 ${className} relative`}
        data-test-id="error-alert"
      >
        Error: {error.message}
        {showClose && (
          <button
            className="absolute right-1 top-2/4 -translate-y-2/4 w-9 h-9 rounded hover:bg-red-300 actve:bg-red-400"
            onClick={() => setError(null)}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        )}
      </div>
    )
  );
}

export default ErrorAlert;
