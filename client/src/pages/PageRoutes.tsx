import { Routes, Route } from "react-router-dom";
import HomePage from "./home/HomePage";
import NotFound from "./not-found/NotFound";
import ProblemPage from "./problem/ProblemPage";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="problem" element={<ProblemPage />} />
      <Route index element={<HomePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PageRoutes;
