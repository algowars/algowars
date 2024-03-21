import { Route, Routes } from "react-router-dom";
import HomePage from "./home/home.page";
import NotFoundpage from "./not-found/not-found.page";
import { AuthenticationGuard } from "../../../client-old/src/guards/AuthenticationGuard";
import CreatePage from "./create/create.page";
import CreateProblemPage from "./create/create-problem/create-problem.page";
import SetupPage from "./account/setup/setup.page";
import CreateTestSetupPage from "./create/create-test-setup/create-test-setup.page";
import ProblemPage from "./problems/problem/problem.page";
import ProfilePage from "./profile/profile.page";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="profile/:username" element={<ProfilePage />} />
      <Route
        path="account/setup"
        element={<AuthenticationGuard component={SetupPage} />}
      />
      <Route
        path="create"
        element={<AuthenticationGuard component={CreatePage} />}
      >
        <Route
          path="test-setup"
          element={<AuthenticationGuard component={CreateTestSetupPage} />}
        />
        <Route
          path="problem"
          element={<AuthenticationGuard component={CreateProblemPage} />}
        />
      </Route>
      <Route path="problems/:slug" element={<ProblemPage />} />
      <Route index element={<HomePage />} />
      <Route path="*" element={<NotFoundpage />} />
    </Routes>
  );
};

export default PageRoutes;
