import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Props = {
  rating: number;
};

const ProblemRating = ({ rating }: Props) => {
  let difficulty = "easy";
  if (rating > 1000) {
    difficulty = "medium";
  }
  if (rating > 2000) {
    difficulty = "hard";
  }
  return (
    <Badge
      variant="secondary"
      className={cn(
        difficulty === "easy"
          ? "text-green-600"
          : difficulty === "medium"
          ? "text-yellow-600"
          : difficulty === "hard"
          ? "text-red-600"
          : "",
        "flex justify-center items-center w-12"
      )}
    >
      {difficulty}
    </Badge>
  );
};

export default ProblemRating;
