import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import AuthProviderWithNavigate from "./features/auth/context/auth-provider-with-navigate";
import { ThemeProvider } from "./features/theme/theme.provider";
import { Provider } from "react-redux";
import { setupStore } from "./store/store";
import { SocketProvider } from "./common/socket/socket.provider";

const queryClient = new QueryClient();
const store = setupStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProviderWithNavigate>
          <Provider store={store}>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </Provider>
        </AuthProviderWithNavigate>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
