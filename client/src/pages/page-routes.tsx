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
import CodeRushPage from "./code-rush/code-rush.page";
import ProblemsPage from "./problems/problems.page";
import SettingsPage from "./settings/settings.page";
import SettingsProfilePage from "./settings/settings-profile/settings-profile.page";
import SettingsAccountPage from "./settings/settings-account/settings-account.page";
import SettingsAppearancePage from "./settings/settings-appearance/settings-appearance.page";
import SettingsNotificationsPage from "./settings/settings-notifications/settings-notifications.page";
import CodeRushPlayPage from "./code-rush/code-rush-play/code-rush-play.page";
import CodeRushPlayStart from "./code-rush/code-rush-play/code-rush-play-start/code-rush-play-start";

const PageRoutes = () => {
  return (
    <Routes>
      <Route
        path="settings"
        element={<AuthenticationGuard component={SettingsPage} />}
      >
        <Route
          index
          element={<AuthenticationGuard component={SettingsProfilePage} />}
        />
        <Route
          path="account"
          element={<AuthenticationGuard component={SettingsAccountPage} />}
        />
        <Route
          path="appearance"
          element={<AuthenticationGuard component={SettingsAppearancePage} />}
        />
        <Route
          path="notifications"
          element={
            <AuthenticationGuard component={SettingsNotificationsPage} />
          }
        />
      </Route>
      <Route
        path="rush/:rushId"
        element={<AuthenticationGuard component={CodeRushPlayPage} />}
      >
        <Route path="play" element={<CodeRushPlayStart />} />
      </Route>
      <Route path="rush" element={<CodeRushPage />} />
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
      <Route path="problems" element={<ProblemsPage />} />
      <Route path="problems/:slug" element={<ProblemPage />} />
      <Route path="dashboard" element={<HomePage />} />
      <Route index element={<Landing />} />
      <Route path="*" element={<NotFoundpage />} />
    </Routes>
  );
};

export default PageRoutes;
