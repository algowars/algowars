import { Auth0Provider, AppState } from "@auth0/auth0-react";
import { env } from "@/config/env";
import { ReactNode } from "react";
import { redirect } from "react-router-dom";

export type AuthProviderProps = {
  children?: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const domain = env.AUTH_DOMAIN;
  const clientId = env.AUTH_CLIENT_ID;
  const redirectUri = env.AUTH_CALLBACK_URL;
  const audience = env.AUTH_AUDIENCE;

  const onRedirectCallback = (appState?: AppState) => {
    redirect(appState?.returnTo || window.location.pathname);
  };

  if (!(domain && clientId && redirectUri && audience)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        audience: audience,
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
