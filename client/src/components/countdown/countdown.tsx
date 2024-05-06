import { useEffect, useState } from "react";
import TypographyH2 from "../ui/typography/typography-h2";

type Props = {
  startTime: Date;
};

const Countdown = ({ startTime }: Props) => {
  console.log("HERE: ", startTime);
  const [countdown, setCountDown] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const start = new Date(startTime);
      const secondsUntilStart = Math.ceil(
        (start.getTime() - now.getTime()) / 1000
      );

      if (secondsUntilStart >= 0) {
        setCountDown(secondsUntilStart);
      } else {
        clearInterval(intervalId); // Stop the countdown when time is up
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startTime]);

  if (countdown <= 0) {
    return null;
  }

  return (
    <div className="h-screen bg-background/60 fixed top-0 left-0 right-0 flex justify-center items-center">
      <h2 className="text-3xl font-semibold">
        Game starts in {countdown} seconds...
      </h2>
    </div>
  );
};

export default Countdown;
