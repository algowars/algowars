import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAccountExistence } from "../../hooks/useAccountExistence";

const AccountDoesNotExistBanner = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { getAccountStatus, AccountStatus } = useAccountExistence();
  useEffect(() => {
    const { status } = getAccountStatus();
    if (
      status !== AccountStatus.NOT_SIGNED_IN &&
      status !== AccountStatus.ACCOUNT_SETUP
    ) {
      setIsOpen(true);
    }
  }, [
    AccountStatus.ACCOUNT_SETUP,
    AccountStatus.NOT_SIGNED_IN,
    getAccountStatus,
  ]);

  return isOpen ? (
    <div className="flex justify-center  items-center gap-5 p-1 text-sm bg-indigo-800 text-white">
      <p>
        You're account isn't finished being setup. To finish setting up your
        account,{" "}
        <Link to="/account/setup" className="underline underline-offset-2">
          click here
        </Link>
      </p>
      <button
        onClick={() => setIsOpen(false)}
        className="hover:bg-indigo-900 active:bg-indigo-950 duration-200 ease-out w-8 h-8 flex items-center justify-center rounded"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  ) : null;
};

export default AccountDoesNotExistBanner;
