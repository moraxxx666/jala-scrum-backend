import IO from "socket.io";
import config from "./config";

class Socket {
    io: IO.Server;
    constructor(httpServer: ) {
        this.io = IO(httpServer)
    }
}