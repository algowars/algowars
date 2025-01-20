import { Badge } from "../ui/badge";

type DifficultyBadgeProps = {
  difficulty: number;
};

export const DifficultyBadge = ({ difficulty }: DifficultyBadgeProps) => {
  let label: string;
  let color:
    | "success"
    | "caution"
    | "destructive"
    | "default"
    | "secondary"
    | "outline"
    | null
    | undefined;

  if (difficulty < 1000) {
    label = "Easy";
    color = "success";
  } else if (difficulty >= 1000 && difficulty < 2000) {
    label = "Medium";
    color = "caution";
  } else {
    label = "Hard";
    color = "destructive";
  }

  return <Badge variant={color}>{label}</Badge>;
};
