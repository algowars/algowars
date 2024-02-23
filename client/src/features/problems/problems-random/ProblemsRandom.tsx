import ErrorAlert from "@/errors/ErrorAlert";
import { useProblemsRandom } from "./ProblemsRandom.hooks";
import ProblemsRandomCard from "./problems-random-card/ProblemsRandomCard";

const ProblemsRandom = () => {
  const { problem, error } = useProblemsRandom();
  return problem ? (
    <div className="flex flex-col gap-3">
      <ErrorAlert error={error} />
      <ProblemsRandomCard problem={problem} />
    </div>
  ) : null;
};

export default ProblemsRandom;
