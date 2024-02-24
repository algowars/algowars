import { Input } from "@/components/ui/input";
import { ProblemInitialInputsModel } from "@/models/problem/ProblemInitialInputsModel";

type Props = {
  initialInputs: ProblemInitialInputsModel[];
};

const ProblemTestcaseInputs = ({ initialInputs }: Props) => {
  console.log(initialInputs);
  return (
    <ul>
      {initialInputs.map((input) => (
        <li key={input.id} className="flex flex-col gap-2">
          <label
            htmlFor={`${input.id}`}
            className="text-stone-400 dark:text-stone-400"
          >
            n =
          </label>
          <Input value={input.inputs} id={`${input.id}`} />
        </li>
      ))}
    </ul>
  );
};

export default ProblemTestcaseInputs;
