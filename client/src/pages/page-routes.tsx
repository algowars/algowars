import { Route, Routes } from "react-router-dom";
import LandingPage from "./landing/landing.page";
import NotFoundPage from "./not-found/not-found.page";

const PageRoutes = () => {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default PageRoutes;
