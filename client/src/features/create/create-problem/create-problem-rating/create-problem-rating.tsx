import { Label } from "@/components/ui/label";
import { useCreateProblem } from "../create-problem.provider";
import { Input } from "@/components/ui/input";

const CreateProblemRating = () => {
  const { createProblem, changeCreateProblem } = useCreateProblem();

  const changeRating = (value: string) => {
    if (!value) {
      changeCreateProblem("rating", value);
      return;
    }

    const rating = parseInt(value, 10);
    if (!isNaN(rating) && rating >= 0 && rating <= 2000) {
      changeCreateProblem("rating", rating);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="rating">Estimated Rating (0-2000)</Label>
      <Input
        id="rating"
        placeholder="rating"
        value={createProblem.rating}
        onChange={({ target: { value } }) => changeRating(value)}
      />
    </div>
  );
};

export default CreateProblemRating;
