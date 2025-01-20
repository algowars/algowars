import { cn } from "@/lib/utils";

type PlayerRankBadgeProps = {
  elo: number;
  className?: string;
};

export const PlayerRankBadge = ({ elo, className }: PlayerRankBadgeProps) => {
  let label: string;
  let backgroundColor: string;
  let textColor: string;

  if (elo <= 750) {
    label = "Bronze";
    backgroundColor = "#cd7f32"; // Bronze background
    textColor = "#fff";
  } else if (elo > 750 && elo <= 1500) {
    label = "Silver";
    backgroundColor = "#c0c0c0"; // Silver background
    textColor = "#000";
  } else if (elo > 1500 && elo <= 2000) {
    label = "Gold";
    backgroundColor = "#ffd700"; // Gold background
    textColor = "#000";
  } else {
    label = "Platinum";
    backgroundColor = "#4a90e2"; // Platinum background
    textColor = "#000";
  }

  return (
    <div
      className={cn(
        "rounded px-4 py-2 w-fit font-bold text-center flex justify-center items-center",
        className
      )}
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
      }}
    >
      {label}
    </div>
  );
};
