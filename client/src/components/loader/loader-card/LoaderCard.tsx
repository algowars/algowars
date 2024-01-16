import ToastInformation from "../../toast/toast-information/ToastInformation";
import LoaderPrimary from "../loader-primary/LoaderPrimary";

type Props = {
  isLoading: boolean;
};

const LoaderCard = ({ isLoading }: Props) => {
  if (!isLoading) {
    return null;
  }

  return (
    <ToastInformation className="w-48">
      <div className="flex items-center justify-center gap-5">
        <p className="font-semibold">Loading</p>
        <LoaderPrimary />
      </div>
    </ToastInformation>
  );
};

export default LoaderCard;
