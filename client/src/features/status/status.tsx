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

  const ACCEPTED = 3;

  const badStatuses = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  return (
    <TypographyH4
      className={
        badStatuses.includes(foundStatus.id)
          ? "text-red-600 dark:text-red-500"
          : foundStatus.id === ACCEPTED
          ? "text-green-500 dark:text-green-500"
          : ""
      }
    >
      {foundStatus.description}
    </TypographyH4>
  );
};

export default Status;
