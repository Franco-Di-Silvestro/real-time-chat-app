/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, ReactNode, useState, useEffect, useContext } from "react";
import { Socket, io } from "socket.io-client";
import { useAuthContext } from "./AuthContext";

interface ISocketContext {
    socket: Socket | null;
    onlineUsers: any[];
}

interface ISocketContextProviderProps {
    children: ReactNode;
}

const SocketContext = createContext<ISocketContext | undefined>(undefined);

export const useSocketContext = (): ISocketContext => {
    return useContext(SocketContext)!;
}

export const SocketContextProvider = ({ children }: ISocketContextProviderProps) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        let newSocket: Socket | null = null;

        if (authUser) {
            newSocket = io("http://localhost:5000/", { query: { userId: authUser._id } });
            setSocket(newSocket);

            newSocket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });
        }

        return () => {
                newSocket?.close();
        };
    }, [authUser]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
