import socketIOClient from "socket.io-client";

/////////////////////////////////////////////////

export const io = () => {
    return socketIOClient(window.BASE_API_URL  ?  "https://cashmachineapi.herokuapp.com:3100" : "http://localhost:3100");
}

/////////////////////////////////////////////////