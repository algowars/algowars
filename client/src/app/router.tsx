import { PermissionProtectedRoute } from "@/components/auth/permission-protected-route/permission-protected-route";
import { ProtectedRoute } from "@/components/auth/protected-route/protected-route";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

export const routerConfig = {
  root: {
    path: "/",
  },
  profile: {
    path: "/profile/:username",
    execute: (subPath: string) => `/profile/${encodeURIComponent(subPath)}`,
  },
  appRoot: {
    path: "/",
  },
  accountSetup: {
    path: "/account/setup",
  },
  admin: {
    path: "/admin",
  },
  adminCreateProblem: {
    path: "/admin/create-problem",
  },
  problem: {
    path: "/problem/:slug",
    execute: (subPath: string) => `/problem/${encodeURIComponent(subPath)}`,
  },
  problemSolutions: {
    path: "/problem/:slug/solutions",
    execute: (subPath: string) =>
      `/problem/${encodeURIComponent(subPath)}/solutions`,
  },
  notFound: {
    path: "*",
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

        return {
          Component: (props: object) => (
            <ProtectedRoute component={AccountSetupRoute} {...props} />
          ),
        };
      },
    },
    {
      path: routerConfig.notFound.path,
      lazy: async () => {
        const { NotFoundRoute } = await import("./routes/app/not-found");
        return { Component: NotFoundRoute };
      },
    },
    {
      path: routerConfig.problem.path,
      lazy: async () => {
        const { ProblemRoute } = await import("./routes/app/problem");

        return { Component: ProblemRoute };
      },
    },
    {
      path: routerConfig.admin.path,
      lazy: async () => {
        const { AdminRoute } = await import("./routes/app/admin");

        return {
          Component: (props: object) => (
            <PermissionProtectedRoute
              component={AdminRoute}
              {...props}
              allowedPermissions={["Admin"]}
            />
          ),
        };
      },
    },
    {
      path: routerConfig.adminCreateProblem.path,
      lazy: async () => {
        const { AdminCreateProblemRoute } = await import(
          "./routes/app/admin/create-problem"
        );

        return {
          Component: (props: object) => (
            <PermissionProtectedRoute
              component={AdminCreateProblemRoute}
              {...props}
              allowedPermissions={["Admin"]}
            />
          ),
        };
      },
    },
    {
      path: routerConfig.problemSolutions.path,
      lazy: async () => {
        const { ProblemSolutionsRoute } = await import(
          "./routes/app/problem/solutions"
        );

        return {
          Component: (props: object) => (
            <ProtectedRoute component={ProblemSolutionsRoute} {...props} />
          ),
        };
      },
    },
    {
      path: routerConfig.profile.path,
      lazy: async () => {
        const { ProfileRoute } = await import("./routes/app/profile");

        return {
          Component: ProfileRoute,
        };
      },
    },
  ]);
};

export const AppRouter = () => {
  const queryClient = useQueryClient();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const router = useMemo(() => createAppRouter(), [queryClient]);

  return <RouterProvider router={router} />;
};
