import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import IO from "socket.io";
import config from "./config";
import("./database");
import APIRoutes from "./routes/api.routes";
// Initialization
const app = express();

//midlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// rutas
app.use("/api", APIRoutes);
//Iniciando el server
const HttpServer = app.listen(config.PORT, () => {
  console.log(`App runing on port ${config.PORT}`);
});
let ConnectedPeople = 0;
const io = IO(HttpServer)
io.on('connection', (socket) => {

  // New User in The App

  socket.emit('saludo', "hola")
  ++ConnectedPeople
  console.log("New user Register: " + ConnectedPeople)
  // New Room has been created
  socket.on("new room", () => {
    console.log("New Room created")
  })

  //testing
  socket.on("boton",(obj:string)=>{
    console.log(obj)
    socket.emit("saludo",obj)
  })

  // 
  socket.on('disconnect', () => {

    --ConnectedPeople
    console.log("A user has left the app", ConnectedPeople)
  })



})
