import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CSS_COLOR_NAMES from './colors.js';
import reportWebVitals from './reportWebVitals';
import { MapContainer, Polyline, TileLayer, Marker, Popup } from 'react-leaflet';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardColumns } from 'react-bootstrap';
import ChatRoom from './ChatRoom.js';
import * as L from "leaflet";
import airplane from './airplane.svg.png'


const io = require("socket.io-client");
const socket = io('wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl', {
  path: '/flights'
});

socket.emit("FLIGHTS")

const Markers = () =>  {
  const [flights, setFlights] = React.useState([]);
  socket.on("FLIGHTS", data => {
    setFlights(oldArray => [...oldArray, data]);
  });
  const [position, setPosition] = React.useState({"code": "", "position": [30, 30]});
  socket.on("POSITION", data => {
    setPosition(data);
  });

  return (
    <ol>
    {flights.map((flight, i) => (
      flight.map((data,index) => (
        position.code === data.code ? <Marker position={position.position} icon={L.icon({iconUrl: airplane, iconSize: [20, 20]})}>
          <Popup>{data.code}</Popup>
        </Marker> : null
        ))))}
    </ol>
      );
};

// const Traits = () =>  {
//   const [positions, setPosition] = React.useState([]);

//   const [flights, setFlights] = React.useState([]);
//   socket.on("FLIGHTS", data => {
//     setFlights(oldArray => [...oldArray, data]);
//   });

//   socket.on("POSITION", data => {
//     setPosition(oldArray => [...oldArray, data]);
//   });
//   return (
//     <ol>
//     {positions.map((flight_position, i) => (
//       <Circle center={flight_position.position} radius={10} pathOptions={{color: 'white'}}/>))}
//     </ol> );
// };


const DrawLines = () => {
  const [flights, setFlights] = React.useState([]);
  socket.on("FLIGHTS", data => {
    setFlights(oldArray => [...oldArray, data]);
  });
  return (
    <ol>
    {flights.map((flight, i) => (
      flight.map((data,index) => ( 
        <Polyline positions={[data.origin, data.destination]} pathOptions={{color: CSS_COLOR_NAMES[index], dashArray: '5, 5'}}/>
        ))))}
    </ol>
     );
}
 

const Flights = () =>  {
  const [flights, setFlights] = React.useState([]);
  socket.on("FLIGHTS", data => {
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
             Avi??n: {data.plane}
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


// const FlightData = () => {
//   const [flights, setFlights] = React.useState([]);
//   socket.on("FLIGHTS", data => {
//     setFlights(oldArray => [...oldArray, data]);
//   });
//   return (
//     <div></div>
//   )
// }

ReactDOM.render(
  <React.StrictMode>
      <div className="wrapper">

        <div className="three">
        <Card border="secondary" style={{ width: '60rem' }}>
          <Card.Header>Mapa "En vivo"</Card.Header>
          <Card.Body> 
          <div className="leaflet-container">
          <MapContainer center={[30.5, 10.5]} zoom={2} scrollWheelZoom={false}>
            <Markers />
            <DrawLines />
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
          <Card.Header>Informaci??n de los vuelos</Card.Header>
          <Card.Body> 
          {/* <button onClick={ socket.emit("FLIGHTS") }>
            Get Info
            </ button> */}
            <Flights />
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

