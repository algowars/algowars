import { Route, Routes } from "react-router-dom";
import LandingPage from "./landing/landing.page";
import NotFoundPage from "./not-found/not-found.page";
import ProblemsPage from "./problems/problems.page";
import { AuthenticationGuard } from "@/features/auth/guards/authentication.guard";
import AccountSetupPage from "./account/setup/account-setup.page";
import DashboardPage from "./dashboard/dashboard.page";
import ProblemPage from "./problem/problem.page";

const PageRoutes = () => {
  return (
    <Routes>
      <Route
        path="account/setup"
        element={<AuthenticationGuard component={AccountSetupPage} />}
      />
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="problem/:slug" element={<ProblemPage />} />
      <Route path="problems" element={<ProblemsPage />} />
      <Route index element={<LandingPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default PageRoutes;
