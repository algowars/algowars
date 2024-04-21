import {
  ReactNode,
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
import { useAuth0 } from "@auth0/auth0-react";
import { submissionService } from "@/features/submission/services/submission.service";
import ErrorAlertFixed from "@/errors/error-alert-fixed/error-alert-fixed";
import { SubmissionStatus } from "@/features/submission/judge-submission-status.model";
import { SubmissionStatusDescription } from "@/features/submission/judge-submission-status-description.model";
import { SubmissionAggregate } from "@/features/submission/submission-aggregate.model";

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
  submissionAggregate: SubmissionAggregate | null | undefined;
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
  submissionAggregate: undefined,
  runTests: () => null,
  submitCode: () => null,
  isSubmissionPending: false,
};

const isSubmissionFinished = (statuses: SubmissionStatus[]): boolean => {
  for (const status of statuses) {
    if (
      status.description === SubmissionStatusDescription.IN_QUEUE ||
      status.description === SubmissionStatusDescription.PROCESSING
    ) {
      return false;
    }
  }

  return true;
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

  const { data: submissionAggregate, error: pollingError } = useQuery({
    queryKey: ["poll-submission", submissionId],
    refetchInterval: () => (isSubmissionPending ? 2_000 : false),
    queryFn: async () => {
      if (!submissionId || !isSubmissionPending) {
        return null;
      }

      const accessToken = await getAccessTokenSilently();

      const submissionAggregate = await submissionService.getSubmissionById(
        accessToken,
        submissionId
      );

      if (submissionAggregate) {
        const statuses = submissionAggregate.judgeSubmissions.map(
          (sub) => sub.status
        );

        if (isSubmissionFinished(statuses)) {
          setIsSubmissionPending(false);

          return submissionAggregate;
        }
      }

      return null;
    },
  });

  useEffect(() => {
    if (isSubmissionSubmitPending) {
      setIsSubmissionPending(true);
    }

    if (pollingError || submissionError) {
      setIsSubmissionPending(false);
    }
  }, [isSubmissionSubmitPending, pollingError, submissionError]);

  const value = {
    problemAggregate,
    isLoading,
    isSubmissionPending,
    error,
    createSubmissionDto,
    changeCreateSubmissionDto,
    submissionAggregate,
    runTests,
    submitCode,
  };

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
