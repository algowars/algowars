import { ReactNode } from "react";
import { ServerHealth } from "./server-health";

type ServerHealthProviderProps = {
  children?: ReactNode;
};

type ServerHealthProviderState = {
  serverHealth: ServerHealth;
};
