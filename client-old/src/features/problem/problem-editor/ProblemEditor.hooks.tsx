import { ProblemTestModel } from "@/models/problem/ProblemTestModel";
import { useState } from "react";

const initialSolution = `
const solution = (a, b) => {
    // solution goes here
}
`;

export const useProblemEditor = () => {
  const [title, setTitle] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [question, setQuestion] = useState<string>("# Question goes here");
  const [solution, setSolution] = useState<string>(initialSolution);
  const [tests, setTests] = useState<ProblemTestModel[]>([]);

  const changeTitle = (value: string) => {
    setTitle(value);
  };

  const changeSlug = (value: string) => {
    setSlug(value);
  };

  const changeQuestion = (value: string) => {
    setQuestion(value);
  };

  const changeSolution = (value: string | undefined) => {
    setSolution(value ?? "");
  };

  return {
    title,
    changeTitle,
    solution,
    changeSolution,
    slug,
    changeSlug,
    tests,
    setTests,
    question,
    changeQuestion,
  };
};
