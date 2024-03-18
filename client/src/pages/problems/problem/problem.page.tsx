import ProblemPlay from "@/features/problem/problem-play/problem-play";
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
      <ProblemPlay slug={slug} />
    </LayoutFull>
  );
};

export default ProblemPage;
