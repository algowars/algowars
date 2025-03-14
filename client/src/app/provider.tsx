import { AuthProvider } from "@/components/auth/auth-provider/auth-provider";
import { MainErrorFallback } from "@/components/error/main-error-fallback";
import { PageLoader } from "@/components/loader/page-loader/page-loader";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { AccountProvider } from "@/features/account/account.provider";
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
    <Suspense fallback={<PageLoader />}>
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <HelmetProvider>
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              <AccountProvider>
                <ThemeProvider>
                  {import.meta.env.DEV && <ReactQueryDevtools />}
                  {children}
                </ThemeProvider>
              </AccountProvider>
            </QueryClientProvider>
          </AuthProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </Suspense>
  );
};
