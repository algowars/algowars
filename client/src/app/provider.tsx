import { AuthProvider } from "@/components/auth/auth-provider/auth-provider";
import { IsAuthLoaded } from "@/components/auth/is-auth-loaded/is-auth-loaded";
import { MainErrorFallback } from "@/components/error/main-error-fallback";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Spinner } from "@/components/ui/spinner";
import { AccountStoreProvider } from "@/features/account/account-store.provider";
import { queryConfig } from "@/lib/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";

type AppProviderProps = {
  children?: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig,
      })
  );

  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <Spinner size="xl" />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <HelmetProvider>
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              <AccountStoreProvider>
                <ThemeProvider>
                  <IsAuthLoaded>
                    {import.meta.env.DEV && <ReactQueryDevtools />}
                    {children}
                  </IsAuthLoaded>
                </ThemeProvider>
              </AccountStoreProvider>
            </QueryClientProvider>
          </AuthProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </Suspense>
  );
};
