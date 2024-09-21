import { ProtectedRoute } from "@/components/auth/protected-route/protected-route";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppRoot } from "./routes/app/root";

export const createAppRouter = () => {
  return createBrowserRouter([
    {
      path: "/",
      lazy: async () => {
        const { LandingRoute } = await import("./routes/landing");
        return { Component: LandingRoute };
      },
    },
    {
      path: "/app",
      element: <ProtectedRoute component={AppRoot} />,
      children: [
        {
          path: "/app/account/setup",
          lazy: async () => {
            const { AccountSetupRoute } = await import(
              "./routes/app/account/setup"
            );
            return { Component: AccountSetupRoute };
          },
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
