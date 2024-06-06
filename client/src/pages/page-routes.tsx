import { Route, Routes } from "react-router-dom";
import LandingPage from "./landing/landing.page";
import NotFoundPage from "./not-found/not-found.page";
import ProblemsPage from "./problems/problems.page";
import { AuthenticationGuard } from "@/features/auth/guards/authentication.guard";
import AccountSetupPage from "./account/setup/account-setup.page";

const PageRoutes = () => {
  return (
    <Routes>
      <Route
        path="account/setup"
        element={<AuthenticationGuard component={AccountSetupPage} />}
      />
      <Route path="problems" element={<ProblemsPage />} />
      <Route index element={<LandingPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default PageRoutes;
