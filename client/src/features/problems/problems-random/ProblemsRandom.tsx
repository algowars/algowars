import { useProblemRandom } from "@/services/useProblem";
import ProblemsRandomCard from "./problems-random-card/ProblemsRandomCard";
import { useState } from "react";

const ProblemsRandom = () => {
  const [notAllowedProblemIds] = useState<number[]>([]);
  const problem = useProblemRandom(notAllowedProblemIds);
  console.log(problem.data);
  return problem.data ? <ProblemsRandomCard problem={problem.data} /> : null;
};

export default ProblemsRandom;
