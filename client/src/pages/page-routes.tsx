import { Route, Routes } from "react-router-dom";
import HomePage from "./home/home.page";
import NotFoundpage from "./not-found/not-found.page";

const PageRoutes = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="*" element={<NotFoundpage />} />
    </Routes>
  );
};

export default PageRoutes;
