type Props = {
  error?: { message: string } | null;
  showClose?: boolean;
  setError: React.Dispatch<React.SetStateAction<{ message: string } | null>>;
};

const ErrorAlertFixed = ({ error, showClose, setError }: Props) => {
  return (
    error &&
    error.message && (
      <div
        className={`${
          showClose ? "pl-3 pr-1 py-2" : "p-3"
        } bg-red-200 border rounded border-red-700 text-red-700 fixed left-1/2 -translate-x-1/2 gap-2 top-5 w-11/12 md:w-fit flex justify-between items-center`}
      >
        <p>Error: {error.message}</p>
        {showClose && (
          <button
            className="w-9 h-9 rounded hover:bg-red-300 actve:bg-red-400 ease-out duration-200"
            onClick={() => setError(null)}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        )}
      </div>
    )
  );
};

ErrorAlertFixed.defaultProps = {
  classes: "",
};

export default ErrorAlertFixed;
