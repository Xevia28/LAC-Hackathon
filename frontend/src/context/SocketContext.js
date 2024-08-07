import { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
    // const [socket, setSocket] = useState(null);
    // const [onlineUsers, setOnlineUsers] = useState([]);

    // check if user logged in
    // useEffect(() => {
    // if user logged in (authenticated)
    // const socket = io("http://localhost:3001");
    // setSocket(socket);
    // return () => socket.close();
    // else:
    // if (socket){
    //     socket.close();
    //     setSocket(null);
    // }
    // })
    // return <SocketContext.Provider value={{socket, onlineUsers}}>{children}</SocketContext.Provider>
    return <SocketContext.Provider value={{}}>{children}</SocketContext.Provider>
}