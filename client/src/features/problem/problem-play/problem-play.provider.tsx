import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { AppError } from "@/errors/app-error.model";
import { problemService } from "../services/problem.service";
import { ProblemAggregate } from "../problem-aggregate";
import { CreateSubmissionDto } from "@/features/submission/dtos/create-submission.dto";
import { Submission } from "@/features/submission/sbumission.model";
import { useSocket } from "@/common/socket/socket.provider";
import { JudgeSubmission } from "@/features/submission/judge-submission.model";
import { SubmissionStatusDescription } from "@/features/submission/judge-submission-status-description.model";

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
  setSubmission: Dispatch<SetStateAction<Submission | undefined>>;
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
  setSubmission: () => null,
  isSubmissionPending: false,
};

const ProblemPlayProviderContext =
  createContext<ProblemPlayState>(initialState);

export function ProblemProvider({
  children,
  slug,
  ...props
}: ProblemPlayProps) {
  const { socket } = useSocket();
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
  const [submission, setSubmission] = useState<Submission | undefined>(
    undefined
  );
  const [isSubmissionPending, setIsSubmissionPending] =
    useState<boolean>(false);

  const changeCreateSubmissionDto = <K extends keyof CreateSubmissionDto>(
    key: K,
    value: CreateSubmissionDto[K]
  ) => {
    setCreateSubmissionDto((curr) => ({ ...curr, [key]: value }));
  };

  useEffect(() => {
    if (submission) {
      setIsSubmissionPending(true);
      const handleStatusUpdate = ({
        submissions,
      }: {
        submissions: JudgeSubmission[];
      }) => {
        if (submissions) {
          const submissionDescriptions = submissions.map(
            (submission) => submission.status.description
          );
          if (
            !submissionDescriptions.includes(
              SubmissionStatusDescription.IN_QUEUE
            ) &&
            !submissionDescriptions.includes(
              SubmissionStatusDescription.PROCESSING
            )
          ) {
            console.log("IN HERE");
            setSubmission((curr) => {
              if (!curr) return undefined;
              const updatedSubmission: Submission = {
                ...curr,
                judgeSubmissions: submissions,
                id: curr.id,
              };

              return updatedSubmission;
            });
            setIsSubmissionPending(false);
            socket?.off("submissionStatus", handleStatusUpdate);
          }
        }
      };

      socket?.on("submission-details", handleStatusUpdate);

      return () => {
        socket?.off("submission-details", handleStatusUpdate);
      };
    }
  }, [submission, socket]);

  const value = {
    problemAggregate,
    isLoading,
    error,
    createSubmissionDto,
    changeCreateSubmissionDto,
    submission,
    setSubmission,
    isSubmissionPending,
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
