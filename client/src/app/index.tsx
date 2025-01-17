import { AccountPersistence } from "@/features/account/account-persistence/account-persistence";
import { AppProvider } from "./provider";
import { AppRouter } from "./router";

export const App = () => {
  return (
    <AppProvider>
      <AccountPersistence />
      <AppRouter />
    </AppProvider>
  );
};
