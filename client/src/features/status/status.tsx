import TypographyH4 from "@/components/ui/typography/typography-h4";
import { statuses } from "./statuses";

type Props = {
  statusId: number | undefined;
};

const Status = ({ statusId }: Props) => {
  if (!statusId) {
    return null;
  }

  const foundStatus = statuses.find((status) => status.id === statusId);

  if (!foundStatus) {
    return null;
  }

  const WRONG_STATUS = 4;
  const ACCEPTED = 3;

  return (
    <TypographyH4
      className={
        foundStatus.id === WRONG_STATUS
          ? "text-red-600 dark:text-red-500"
          : foundStatus.id === ACCEPTED
          ? "text-green-600 dark:text-green-500"
          : ""
      }
    >
      {foundStatus.description}
    </TypographyH4>
  );
};

export default Status;
