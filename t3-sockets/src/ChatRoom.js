import React from "react";

import "./ChatRoom.css";
import useChat from "./useChat";

const ChatRoom = () => {
  const { messages, sendMessage } = useChat(); // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = React.useState(""); // Message to be sent
  const nickname = "Top Gun";
  
  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage, nickname);
    setNewMessage("");
  };

  return (
    <div className="chat-room-container">
      <div className="messages-container">
        <ol className="messages-list">
          {messages.map((message, i) => (            
            <li
              key={i}
              className={`message-item ${
                message.name === nickname ? "my-message" : "received-message"
              }`}
            >
              {message.name} ({Date(message)}): {message.message}
            </li>
          ))}
        </ol>
      </div>
      <textarea
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Escribe algo..."
        className="new-message-input-field"
      />
      <button onClick={handleSendMessage} className="send-message-button">
        Send
      </button>
    </div>
  );
};

export default ChatRoom;