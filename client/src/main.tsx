import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./stores/store.ts";
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Auth0ProviderWithNavigate>
          <App />
        </Auth0ProviderWithNavigate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
