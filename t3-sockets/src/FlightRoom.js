import React from "react";

import useFlight from "./useFlight";

const FlightRoom = () => { 
    const { messages } = useFlight(); // Creates a websocket and manages messaging
    return (
        <ol className="messages-list">
            <p>chan chan</p>
        {messages.map((message, i) => ( 
            <p>Hola {message}</p>))}
        </ol>
    )
}

export default FlightRoom;