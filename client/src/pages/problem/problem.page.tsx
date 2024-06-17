import PageLoader from "@/components/loader/page-loader/page-loader";
import { EvaluationService } from "@/features/evaluation/services/evaluation.service";
import ProblemEditor from "@/features/problem/problem-editor/problem-editor";
import ProblemEditorFooter from "@/features/problem/problem-editor/problem-editor-footer/problem-editor-footer";
import { ProblemEditorProvider } from "@/features/problem/problem-editor/problem-editor.provider";
import { ProblemService } from "@/features/problem/services/problem.service";
import LayoutProblem from "@/layout/layout-problem/layout-problem";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const ProblemPage = () => {
  const { getAccessTokenSilently } = useAuth0();

  const { slug } = useParams();

  const [sourceCode, setSourceCode] = useState<string>("");

  const changeSourceCode = (val: string) => {
    setSourceCode(val);
  };

  const {
    data: problemAggregate,
    isPending,
    error,
  } = useQuery({
    queryKey: [slug],
    queryFn: async () => {
      if (slug) {
        const problem =
          await ProblemService.getInstance().findProblemAggregateBySlug(slug);

        if (problem.initialCode) {
          setSourceCode(problem.initialCode);
        }

        return problem;
      }
      return null;
    },
  });

  const { mutate: testCode, error: testError } = useMutation({
    mutationKey: ["run-test"],
    mutationFn: async () => {
      const accessToken = await getAccessTokenSilently();

      const tokens = await EvaluationService.getInstance().createAnonymouse(
        accessToken,
        slug ?? "",
        sourceCode
      );

      console.log(tokens);
    },
  });

  useEffect(() => {
    if (error?.message) {
      toast.error(`Error getting the problem "${slug}"`, {
        description: error.message,
      });
    }

    if (testError?.message) {
      toast.error("Error running tests", {
        description: testError.message,
      });
    }
  }, [error?.message, slug, testError?.message]);

  if (isPending) {
    return <PageLoader />;
  }

  return (
    <LayoutProblem>
      {problemAggregate ? (
        <div className="flex flex-col h-full">
          <ProblemEditorProvider
            runExecutable={testCode}
            sourceCode={sourceCode}
            changeSourceCode={changeSourceCode}
          >
            <div className="grow pb-5 px-5">
              <ProblemEditor problemAggregate={problemAggregate} />
            </div>

            <ProblemEditorFooter />
          </ProblemEditorProvider>
        </div>
      ) : null}
    </LayoutProblem>
  );
};

export default ProblemPage;
