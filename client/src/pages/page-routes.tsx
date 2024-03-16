import { Route, Routes } from "react-router-dom";
import HomePage from "./home/home.page";
import NotFoundpage from "./not-found/not-found.page";
import { AuthenticationGuard } from "../../../client-old/src/guards/AuthenticationGuard";
import CreatePage from "./create/create.page";
import CreateProblemPage from "./create/create-problem/create-problem.page";
import SetupPage from "./account/setup/setup.page";

const PageRoutes = () => {
  return (
    <Routes>
      <Route
        path="account/setup"
        element={<AuthenticationGuard component={SetupPage} />}
      />
      <Route
        path="create"
        element={<AuthenticationGuard component={CreatePage} />}
      >
        <Route
          path="problem"
          element={<AuthenticationGuard component={CreateProblemPage} />}
        />
      </Route>
      <Route index element={<HomePage />} />
      <Route path="*" element={<NotFoundpage />} />
    </Routes>
  );
};

export default PageRoutes;
