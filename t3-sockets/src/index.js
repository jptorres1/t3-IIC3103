import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { MapContainer, useMapEvents, TileLayer, Marker } from 'react-leaflet';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardColumns } from 'react-bootstrap';
import ChatRoom from './ChatRoom.js'
// import FlightRoom from './FlightRoom.js'

const io = require("socket.io-client");
const socket = io('wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl', {
  path: '/flights'
});
 socket.emit("FLIGHTS")
socket.onAny((event, ...args) => {
  console.log(`got ${event}`);
});

// socket.on("CHAT", data => {
//   console.log(data);
// });

const Markers = () =>  {
  const [position, setPosition] = React.useState([30, 30]);
  socket.on("POSITION", data => {
    console.log(data);
    setPosition(data.position);
  });
  return (
      <Marker position={position}/>);
};
 

const Flights = () =>  {
  const [flights, setFlights] = React.useState([]);
  socket.on("FLIGHTS", data => {
    console.log(data);
    setFlights(oldArray => [...oldArray, data]);
  });
  return (
    <CardColumns>
    {flights.map((flight, i) => (
      flight.map((data,index) => ( 
       <Card border="secondary" style={{ width: '18rem' }}>
            <Card.Header>Vuelo {data.code}</Card.Header>
            <Card.Body>
            <Card.Text>
             Origen: {data.origin}
            </Card.Text>
           <Card.Text>
             Destino: {data.destination}
           </Card.Text>
            <Card.Text>
             Avión: {data.plane}
            </Card.Text>
           <Card.Text>
          Asientos: {data.seats}
       </Card.Text>
       <Card.Text>
          Pasajeros: {data.passengers.map((passenger, index2) => (<li>{passenger.name} ({passenger.age})</li>))}
       </Card.Text>
       </Card.Body>
       </Card>
    ))))}
    </CardColumns> )}


ReactDOM.render(
  <React.StrictMode>
      <div className="wrapper">

        <div className="three">
        <Card border="secondary" style={{ width: '60rem' }}>
          <Card.Header>Mapa "En vivo"</Card.Header>
          <Card.Body> 
          <div className="leaflet-container">
          <MapContainer center={[30.5, 10.5]} zoom={2} scrollWheelZoom={false}>
            {/* <Markers /> */}
              <TileLayer
                // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
          </MapContainer>
        </div>
          </Card.Body>
        </Card>
        </div>

        <div className="four" >
        <Card border="secondary" style={{ width: '23rem' }}>
          <Card.Header>Centro de Control</Card.Header>
          <Card.Body> <ChatRoom/></Card.Body>
        </Card>
        </div>

        <div className="five" >
        <Card border="secondary" style={{ width: '60rem' }}>
          <Card.Header>Información de los vuelos</Card.Header>
          <Card.Body> 
            <Flights />
          {/* <button onClick={Flights}>
            Get Info
            </ button> */}
          </Card.Body>
        </Card>
        </div>


    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// return (
      //   <Card border="secondary" style={{ width: '15rem' }}>

      //     <Card.Header>Vuelo {data.code}</Card.Header>
      //     <Card.Body>
      //     <Card.Text>
      //       Origen: {data.origin}
      //     </Card.Text>
      //     <Card.Text>
      //       Destino: {data.destination}
      //     </Card.Text>
      //     <Card.Text>
      //       Avión: {data.plane}
      //     </Card.Text>
      //     <Card.Text>
      //       Asientos: {data.seats}
      //     </Card.Text>
      //     </Card.Body>
      //   </Card>
      // )



// {"code": "A087", "origin": "Santiago", "destination": "Balmaceda", 
//                                                 "plane": "LAN81", "seats": 2,
//                                                 "passengers": [{"name": "Juan Torres", "age": 23}, {"name": "Pablo Torres", "age": 24}]},
//                                                 {"code": "A087", "origin": "Santiago", "destination": "Balmaceda", 
//                                                 "plane": "LAN81", "seats": 2,
//                                                 "passengers": [{"name": "Juan Torres", "age": 23}, {"name": "Pablo Torres", "age": 24}]}
