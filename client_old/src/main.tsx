import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setupStore } from "./store/store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "./features/theme/theme.provider";

const queryClient = new QueryClient();
const store = setupStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultMode="dark" modeStorageKey="vite-ui-theme">
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
