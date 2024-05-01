import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { problemService } from "../services/problem.service";
import { Card } from "@/components/ui/card";
import MarkdownViewer from "@/components/markdown-viewer/markdown-viewer";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import TypographyH3 from "@/components/ui/typography/typography-h3";
import TypographyH4 from "@/components/ui/typography/typography-h4";

const ProblemRandom = () => {
  const [disallowedIds, setDisallowedIds] = useState<number[]>([]);

  const { data: problem } = useQuery({
    queryKey: ["random-problem", disallowedIds],
    queryFn: async () => {
      return problemService.getRandomProblem(disallowedIds);
    },
  });

  const skipProblem = () => {
    if (problem) {
      setDisallowedIds((curr) => [...curr, problem.id]);
    }
  };

  return problem ? (
    <Card className="flex flex-col gap-5">
      <div className="border-b p-5">
        <TypographyH3>Random Problem</TypographyH3>
      </div>

      <div className="px-5">
        <TypographyH4>{problem.title}</TypographyH4>
        <MarkdownViewer
          markdown={problem.question}
          className="max-h-[10rem] overflow-auto w-full"
        />
      </div>
      <div className="flex gap-5 items-center border-t p-5">
        <Link
          to={`/problems/${problem.slug}`}
          className={cn(buttonVariants({ variant: "default" }), "w-24")}
        >
          Train
        </Link>
        <Button variant="outline" className="w-24" onClick={skipProblem}>
          Skip
        </Button>
      </div>
    </Card>
  ) : (
    <Card className="p-5">
      <h3 className="font-semibold text-xl">No Problems Available</h3>
    </Card>
  );
};

export default ProblemRandom;
