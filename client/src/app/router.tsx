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
  ]);
  // return createBrowserRouter([
  //   {
  //     path: routerConfig.root.path,
  //     lazy: async () => {
  //       const { LandingRoute } = await import("./routes/landing");
  //       return { Component: LandingRoute };
  //     },
  //   },
  //   {
  //     path: routerConfig.profile.path,
  //     element: <ProfileRoute />,
  //     children: [
  //       {
  //         path: routerConfig.profile.path,
  //         element: <ProfileBioRoute />,
  //       },
  //     ],
  //   },
  //   {
  //     path: routerConfig.appRoot.path,
  //     element: <ProtectedRoute component={AppRoot} />,
  //     children: [
  //       {
  //         path: routerConfig.problemSolutions.path,
  //         lazy: async () => {
  //           const { ProblemSolutions } = await import(
  //             "./routes/app/problem/solutions"
  //           );
  //           return { Component: ProblemSolutions };
  //         },
  //       },
  //       {
  //         path: routerConfig.problem.path,
  //         lazy: async () => {
  //           const { ProblemRoute } = await import("./routes/app/problem");
  //           return { Component: ProblemRoute };
  //         },
  //       },
  //       {
  //         path: routerConfig.appRoot.path,
  //         lazy: async () => {
  //           const { DashboardRoute } = await import("./routes/app/dashboard");
  //           return { Component: DashboardRoute };
  //         },
  //       },
  //       {
  //         path: routerConfig.accountSetup.path,
  //         lazy: async () => {
  //           const { AccountSetupRoute } = await import(
  //             "./routes/app/account/setup"
  //           );
  //           return { Component: AccountSetupRoute };
  //         },
  //       },
  //       {
  //         path: routerConfig.admin.path,
  //         element: (
  //           <PermissionProtectedRoute
  //             component={AdminRoute}
  //             allowedPermissions={["Admin"]}
  //           />
  //         ),
  //       },
  //       {
  //         path: routerConfig.adminCreateProblem.path,
  //         element: (
  //           <PermissionProtectedRoute
  //             component={AdminCreateProblemRoute}
  //             allowedPermissions={["Admin"]}
  //           />
  //         ),
  //       },
  //     ],
  //   },
  // ]);
};

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(), [queryClient]);

  return <RouterProvider router={router} />;
};
