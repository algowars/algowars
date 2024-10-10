import { ProtectedRoute } from "@/components/auth/protected-route/protected-route";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppRoot } from "./routes/app/root";
import { ProfileRoute } from "./routes/app/profile";
import { ProfileBioRoute } from "./routes/app/profile/bio";
import { PermissionProtectedRoute } from "@/components/auth/permission-protected-route/permission-protected-route";
import { AdminRoute } from "./routes/app/admin";
import { AdminCreateProblemRoute } from "./routes/app/admin/create-problem";

export const routerConfig = {
  root: {
    path: "/",
  },
  profile: {
    path: "/profile/:username",
    execute: (subPath: string) => `/profile/${encodeURIComponent(subPath)}`,
  },
  appRoot: {
    path: "/app",
  },
  accountSetup: {
    path: "/app/account/setup",
  },
  admin: {
    path: "/app/admin",
  },
  adminCreateProblem: {
    path: "/app/admin/create-problem",
  },
  problem: {
    path: "/problem/:slug",
    execute: (subPath: string) => `/problem/${encodeURIComponent(subPath)}`,
  },
};

export const createAppRouter = () => {
  return createBrowserRouter([
    {
      path: routerConfig.root.path,
      lazy: async () => {
        const { LandingRoute } = await import("./routes/landing");
        return { Component: LandingRoute };
      },
    },
    {
      path: routerConfig.profile.path,
      element: <ProfileRoute />,
      children: [
        {
          path: routerConfig.profile.path,
          element: <ProfileBioRoute />,
        },
      ],
    },
    {
      path: routerConfig.appRoot.path,
      element: <ProtectedRoute component={AppRoot} />,
      children: [
        {
          path: routerConfig.appRoot.path,
          lazy: async () => {
            const { DashboardRoute } = await import("./routes/app/dashboard");
            return { Component: DashboardRoute };
          },
        },
        {
          path: routerConfig.accountSetup.path,
          lazy: async () => {
            const { AccountSetupRoute } = await import(
              "./routes/app/account/setup"
            );
            return { Component: AccountSetupRoute };
          },
        },
        {
          path: routerConfig.admin.path,
          element: (
            <PermissionProtectedRoute
              component={AdminRoute}
              allowedPermissions={["Admin"]}
            />
          ),
        },
        {
          path: routerConfig.adminCreateProblem.path,
          element: (
            <PermissionProtectedRoute
              component={AdminCreateProblemRoute}
              allowedPermissions={["Admin"]}
            />
          ),
        },
      ],
    },
  ]);
};

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(), [queryClient]);

  return <RouterProvider router={router} />;
};
