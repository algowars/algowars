import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AppError } from "@/errors/app-error.model";
import { problemService } from "../services/problem.service";
import { ProblemAggregate } from "../problem-aggregate.model";
import { CreateSubmissionDto } from "@/features/submission/dtos/create-submission.dto";
import { Submission } from "@/features/submission/sbumission.model";
import { useAuth0 } from "@auth0/auth0-react";
import { submissionService } from "@/features/submission/services/submission.service";
import { JudgeSubmission } from "@/features/submission/judge-submission.model";
import { SubmissionStatusDescription } from "@/features/submission/judge-submission-status-description.model";
import ErrorAlertFixed from "@/errors/error-alert-fixed/error-alert-fixed";

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
  submission: Submission | undefined;
  runTests: () => void;
  submitCode: () => void;
  isSubmissionPending: boolean;
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
  submission: undefined,
  runTests: () => null,
  submitCode: () => null,
  isSubmissionPending: false,
};

const ProblemPlayProviderContext =
  createContext<ProblemPlayState>(initialState);

export function ProblemProvider({
  children,
  slug,
  ...props
}: ProblemPlayProps) {
  const [isSubmissionPending, setIsSubmissionPending] =
    useState<boolean>(false);
  const { getAccessTokenSilently } = useAuth0();
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
  const [submissionId, setIsSubmissionId] = useState<string>("");

  const changeCreateSubmissionDto = <K extends keyof CreateSubmissionDto>(
    key: K,
    value: CreateSubmissionDto[K]
  ) => {
    setCreateSubmissionDto((curr) => ({ ...curr, [key]: value }));
  };

  const { mutate: runTests } = useMutation({
    mutationKey: ["run-tests"],
    mutationFn: async () => {
      const accessToken = await getAccessTokenSilently();
      const createdSubmission = await submissionService.runTests(
        accessToken,
        createSubmissionDto
      );

      if (!createdSubmission) {
        throw new Error("Error creating submission");
      }

      setIsSubmissionId(createdSubmission.id);
    },
  });

  const {
    mutate: submitCode,
    error: submissionError,
    isPending: isSubmissionSubmitPending,
  } = useMutation({
    mutationKey: ["submit-code"],
    mutationFn: async () => {
      console.log("SUBMITTING CODE");
      const accessToken = await getAccessTokenSilently();
      const createdSubmission = await submissionService.createSubmission(
        accessToken,
        createSubmissionDto
      );

      if (!createdSubmission) {
        throw new Error("Error creating submission");
      }

      setIsSubmissionId(createdSubmission.id);
    },
  });

  const {
    data: submission,
    isPending: isPollingPending,
    error: pollingError,
  } = useQuery({
    queryKey: ["poll-submission", submissionId],
    queryFn: async () => {
      if (!submissionId) {
        return null;
      }

      const accessToken = await getAccessTokenSilently();

      const submission = await submissionService.getSubmissionById(
        accessToken,
        submissionId
      );

      console.log(submission);
    },
  });

  useEffect(() => {
    if (isPollingPending || isSubmissionSubmitPending) {
      setIsSubmissionPending(true);
    }
  }, [isPollingPending, isSubmissionSubmitPending]);

  const value = {
    problemAggregate,
    isLoading,
    error,
    createSubmissionDto,
    changeCreateSubmissionDto,
    submission,
    runTests,
    submitCode,
  };

  console.log(submissionError);

  return (
    <ProblemPlayProviderContext.Provider {...props} value={value}>
      <ErrorAlertFixed error={pollingError || submissionError} />
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
