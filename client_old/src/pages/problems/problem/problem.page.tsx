import ProblemPlay from "@/features/problem/problem-play/problem-play";
import { ProblemPlayProvider } from "@/features/problem/problem-play/problem-play.provider";
import LayoutFull from "@/layout/layout-full/layout-full";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProblemPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!slug) {
      navigate("/");
    }
  }, [navigate, slug]);

  if (!slug) {
    return null;
  }

  return (
    <LayoutFull>
      <ProblemPlayProvider slug={slug}>
        <ProblemPlay />
      </ProblemPlayProvider>
    </LayoutFull>
  );
};

export default ProblemPage;
