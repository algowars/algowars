import { Socket, io } from "socket.io-client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth0 } from "@auth0/auth0-react";

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
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const initializeSocket = async () => {
      if (!SERVER_URL) {
        throw new Error("Server URL is required for socket connection.");
      }

      let accessToken = "";

      if (isAuthenticated) {
        accessToken = await getAccessTokenSilently();
      }
      const newSocket = io(SERVER_URL, {
        extraHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    };

    initializeSocket().catch(console.error);
  }, [getAccessTokenSilently, isAuthenticated]);

  const value = { socket };

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
