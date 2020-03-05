import express from "express";
import IO from "socket.io";
import config from "./config";
import("./database");

import mongoose from "mongoose";

import RoomController from "./controllers/room.controller"
import { Room } from "./models/room.model";

// Initialization
const app = express();

//Iniciando el server
const HttpServer = app.listen(config.PORT, () => {
  console.log(`App runing on port ${config.PORT}`);
});

const io = IO(HttpServer);
io.on("connection", socket => {
  // New User in The App

  //Create Room
  socket.on("Create Room", async (obj: any, name: string) => {
    try {
      let RoomObject = <Room>{
        story: obj.story,
        description: obj.description,
        createdBy: name
      }
      let NewRoom = await RoomController.CreateRoom(RoomObject)

      await socket.emit("Message", "Room succesfuly created");
      await socket.emit("Room Created", NewRoom);
    } catch (error) {
      socket.emit("Message", error);
    }
  });
  // Developer connect into a room
  socket.on("Connect Into a Room", async id => {

    try {

      //Verify if Exists the room
      let Room = await RoomController.ObtainRoomIfExists(id)
      if (Room !== null) {

        await socket.join(id)
        socket.emit("OK", Room)
        let UsersInARoom = io.sockets.adapter.rooms[id] || 0
        await io
          .in(id)
          .emit("UserJoinRoom", UsersInARoom.length);
      } else {
        socket.emit("BAD", "The Room was not find id");
      }
    } catch (error) {
      socket.emit("Room BAD", error);

    }
  });
  socket.on("UserLeftRoom", async id => {
    let UsersInARoom = io.sockets.adapter.rooms[id] || 0
    await socket.leave(id);
    await io.in(id).emit("UserJoinRoom", UsersInARoom.length);
  });
  socket.on("CloseRoom", async id => {
    let Room = await RoomController.ObtainRoomIfExists(id)
    if (Room !== null) {
      if (await RoomController.DesactivateRoom(Room)) {
        await io.in(id).emit("ClosedRoom", "This room was close");
      }
    }



  });
  socket.on("ResetRoom", async id => {
    let Room = await RoomController.ObtainRoomIfExists(id);
    if (Room !== null) {
      if (await RoomController.ResetVotes(Room)) {
        await io.in(id).emit("ResetedRoom", "Votes were Reset", Room);
      }
    }
  });
  socket.on("Vote", async (obj: any, id: string, name: string) => {
    let Room = await RoomController.ObtainRoomIfExists(id);
    if (Room !== null) {
      let UserhasVoted = await RoomController.SearchVote(Room,name)
     
      if(UserhasVoted === false){
        if (await RoomController.AddVoteToRoom(Room, obj)) {
          socket.emit("Voted", "You have voted")
          await io.in(id).emit("RefreshVotes", Room);
        }
      }else{
        socket.emit("Message","You have already voted")
      }
     
    }
  })

});
