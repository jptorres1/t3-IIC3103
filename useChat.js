import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "CHAT"; // Name of the event
const SOCKET_SERVER_URL = "wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl";


const useChat = () => {
  const [messages, setMessages] = useState([]); // Sent and received messages
  const socketRef = useRef();

  useEffect(() => {
    
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      path: "/flights",
    });
    
    // Listens for incoming messages
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (incomingMessage) => {
      setMessages((messages) => [...messages, incomingMessage]);
    });
    
    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  });

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendMessage = (messageBody, nickname) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      message: messageBody,
      name: nickname
    });
  };

  return { messages, sendMessage };
};

export default useChat;