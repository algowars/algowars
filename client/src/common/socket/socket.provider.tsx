import { Socket, io } from "socket.io-client";
import { ReactNode, createContext, useContext } from "react";
const SERVER_URL = import.meta.env.VITE_API_SERVER_URL;

export type SocketState = {
  socket: Socket | undefined;
};

const initialState: SocketState = {
  socket: undefined,
};

export const SocketContext = createContext(initialState);

type SocketProps = {
  children: ReactNode;
};

export function SocketProvider({ children, ...props }: SocketProps) {
  if (!SERVER_URL) {
    throw new Error("Socket url is required");
  }

  const socket = io(SERVER_URL);

  const value = {
    socket,
  };

  return (
    <SocketContext.Provider {...props} value={value}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => {
  const context = useContext(SocketContext);

  if (context === undefined) {
    throw new Error("useSOcket must be used within a SocketContextProvider");
  }

  return context;
};
