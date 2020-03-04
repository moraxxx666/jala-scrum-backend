import express from "express";
import IO from "socket.io";
import config from "./config";
import("./database");
import StoryModel, { Story } from "./models/story.model"
// Initialization
const app = express();


//Iniciando el server
const HttpServer = app.listen(config.PORT, () => {
  console.log(`App runing on port ${config.PORT}`);
});
let ConnectedPeople = 0;
const io = IO(HttpServer)
io.on('connection', (socket) => {

  // New User in The App
  
  socket.emit("Message","Welcome to the Scrum Poker App")

  // New Room has been created
  socket.on("new room", () => {
    console.log("New Room created")
  })

  //Create Room
  socket.on("Create Room", async (obj: any) => {

    try {
      let NewRoom = new StoryModel({
        story: obj.story,
        description: obj.description
      })
      const res = await NewRoom.save()
      socket.emit("Message", "Room succesfuly created")
      socket.emit("Room Created", res)
    

    } catch (error) {
      socket.emit("mensaje", error)
    }
  })

  // 
  socket.on('disconnect', () => {

    --ConnectedPeople
    console.log("A user has left the app", ConnectedPeople)
    socket.emit('close')
  })



})
