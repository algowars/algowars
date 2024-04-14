import { Route, Routes } from "react-router-dom";
import HomePage from "./home/home.page";
import NotFoundpage from "./not-found/not-found.page";
import CreatePage from "./create/create.page";
import SetupPage from "./account/setup/setup.page";
import ProblemPage from "./problems/problem/problem.page";
import ProfilePage from "./profile/profile.page";
import { AuthenticationGuard } from "@/features/auth/guards/authentication.guard";
import BattlePage from "./battle/battle.page";
import CreateLobbyPage from "./battle/create-lobby/create-lobby.page";
import Landing from "@/layout/landing/landing";
import BattlesPage from "./battles/battles.page";
import LobbyPage from "./battle/lobby/lobby.page";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="battle/:gameId" element={<BattlePage />}>
        <Route path="lobby" element={<LobbyPage />} />
      </Route>
      <Route path="battle/create-lobby" element={<CreateLobbyPage />} />
      <Route path="battle" element={<BattlesPage />} />
      <Route path="profile/:username" element={<ProfilePage />} />
      <Route
        path="account/setup"
        element={<AuthenticationGuard component={SetupPage} />}
      />
      <Route
        path="create"
        element={<AuthenticationGuard component={CreatePage} />}
      />
      <Route path="problems/:slug" element={<ProblemPage />} />
      <Route path="dashboard" element={<HomePage />} />
      <Route index element={<Landing />} />
      <Route path="*" element={<NotFoundpage />} />
    </Routes>
  );
};

export default PageRoutes;
