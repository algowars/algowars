import { Route, Routes } from "react-router-dom";
import LandingPage from "./landing/landing.page";
import NotFoundPage from "./not-found/not-found.page";
import ProblemsPage from "./problems/problems.page";
import { AuthenticationGuard } from "@/features/auth/guards/authentication.guard";
import AccountSetupPage from "./account/setup/account-setup.page";
import DashboardPage from "./dashboard/dashboard.page";
import ProblemPage from "./problem/problem.page";
import CreatePage from "./create/create.page";
import ProblemResultPage from "./problem/problem-result/problem-result.page";
import ProfilePage from "./profile/profile.page";
import SignInPage from "./sign-in/sign-in.page";
import DocsPage from "./docs/docs.page";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<SignInPage />} />
      <Route path="docs" element={<DocsPage />} />
      <Route
        path="account/setup"
        element={<AuthenticationGuard component={AccountSetupPage} />}
      />
      <Route
        path="create"
        element={<AuthenticationGuard component={CreatePage} />}
      />
      <Route path="dashboard" element={<DashboardPage />} />
      <Route
        path="problem/:slug/result"
        element={<AuthenticationGuard component={ProblemResultPage} />}
      />
      <Route path="problem/:slug" element={<ProblemPage />} />
      <Route path="problems" element={<ProblemsPage />} />
      <Route path="profile/:username" element={<ProfilePage />} />
      <Route index element={<LandingPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default PageRoutes;
