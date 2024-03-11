import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { setupStore } from "./stores/store.ts";
import Auth0ProviderWithNavigate from "./features/auth/Auth0ProviderWithNavigate.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const store = setupStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Auth0ProviderWithNavigate>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </Auth0ProviderWithNavigate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
