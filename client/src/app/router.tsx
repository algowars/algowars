import { PermissionProtectedRoute } from "@/components/auth/permission-protected-route/permission-protected-route";
import { ProtectedRoute } from "@/components/auth/protected-route/protected-route";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootRouteWrapper } from "./root-route-wrapper";
import { routerConfig } from "./router-config";

export const createAppRouter = () => {
  return createBrowserRouter([
    {
      path: routerConfig.root.path,
      lazy: async () => {
        return { Component: RootRouteWrapper };
      },
    },
    {
      path: routerConfig.problems.path,
      lazy: async () => {
        const { ProblemsRoute } = await import("./routes/app/problems");

        return { Component: ProblemsRoute };
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
      path: routerConfig.rush.path,
      lazy: async () => {
        const { RushRoute } = await import("./routes/app/rush");

        return {
          Component: RushRoute,
        };
      },
    },
    {
      path: routerConfig.rushSolo.path,
      lazy: async () => {
        const { SoloRushRoute } = await import("./routes/app/rush/solo");

        return {
          Component: (props: object) => (
            <ProtectedRoute component={SoloRushRoute} {...props} />
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
      path: routerConfig.adminViewProblems.path,
      lazy: async () => {
        const { AdminViewProblemsRoute } = await import(
          "./routes/app/admin/view-problems"
        );

        return {
          Component: (props: object) => (
            <PermissionProtectedRoute
              component={AdminViewProblemsRoute}
              {...props}
              allowedPermissions={["Admin"]}
            />
          ),
        };
      },
    },
    {
      path: routerConfig.adminViewProblem.path,
      lazy: async () => {
        const { AdminViewProblemRoute } = await import(
          "./routes/app/admin/view-problem"
        );

        return {
          Component: (props: object) => (
            <PermissionProtectedRoute
              component={AdminViewProblemRoute}
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
    {
      path: routerConfig.soloRush.path,
      lazy: async () => {
        const { SoloRushRoute } = await import("./routes/app/rush/solo");

        return {
          Component: (props: object) => (
            <ProtectedRoute component={SoloRushRoute} {...props} />
          ),
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
