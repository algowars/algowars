import { ReactNode, createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AppError } from "@/errors/app-error.model";
import { problemService } from "../services/problem.service";
import { ProblemAggregate } from "../problem-aggregate";
import { CreateSubmissionDto } from "@/features/submission/dtos/create-submission.dto";

type ProblemPlayProps = {
  children: ReactNode;
  slug: string;
};

export type ProblemPlayState = {
  problemAggregate: ProblemAggregate | undefined;
  createSubmissionDto: CreateSubmissionDto;
  isLoading: boolean;
  error: AppError | undefined | null;
  changeCreateSubmissionDto: <K extends keyof CreateSubmissionDto>(
    k: K,
    value: CreateSubmissionDto[K]
  ) => void;
};

const initialState: ProblemPlayState = {
  problemAggregate: undefined,
  isLoading: false,
  error: null,
  createSubmissionDto: {
    code: "",
    problemId: null,
  },
  changeCreateSubmissionDto: () => null,
};

const ProblemPlayProviderContext =
  createContext<ProblemPlayState>(initialState);

export function ProblemProvider({
  children,
  slug,
  ...props
}: ProblemPlayProps) {
  const {
    data: problemAggregate,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["problem-aggregate"],
    queryFn: async (): Promise<ProblemAggregate> => {
      if (!slug) {
        throw new Error("Slug is required");
      }

      const problemAggregate = await problemService.getProblemBySlug(slug);
      if (problemAggregate) {
        changeCreateSubmissionDto("problemId", problemAggregate.problem.id);
        changeCreateSubmissionDto("code", problemAggregate.initialCode);
      }
      return problemAggregate;
    },
  });

  const [createSubmissionDto, setCreateSubmissionDto] =
    useState<CreateSubmissionDto>({
      code: "",
      problemId: null,
    });

  const changeCreateSubmissionDto = <K extends keyof CreateSubmissionDto>(
    key: K,
    value: CreateSubmissionDto[K]
  ) => {
    setCreateSubmissionDto((curr) => ({ ...curr, [key]: value }));
  };

  const value = {
    problemAggregate,
    isLoading,
    error,
    createSubmissionDto,
    changeCreateSubmissionDto,
  };

  return (
    <ProblemPlayProviderContext.Provider {...props} value={value}>
      {children}
    </ProblemPlayProviderContext.Provider>
  );
}

export const useProblemPlay = () => {
  const context = useContext(ProblemPlayProviderContext);

  if (context === undefined) {
    throw new Error("useProblemPlay must be used within a ProblemPlayProvider");
  }

  return context;
};
