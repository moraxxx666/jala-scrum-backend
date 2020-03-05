import express from "express";
import IO from "socket.io";
import config from "./config";
import("./database");
import StoryModel, { Story } from "./models/story.model";
import mongoose from "mongoose";
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
      let NewRoom = new StoryModel({
        story: obj.story,
        description: obj.description,
        createdBy: name,
        cards: [
          { val: 1, display: "1" },
          { val: 2, display: "2" },
          { val: 3, display: "3" },
          { val: 5, display: "5" },
          { val: 8, display: "8" },
          { val: 13, display: "13" }
        ]
      });
      const res = await NewRoom.save();
      socket.emit("Message", "Room succesfuly created");
      socket.emit("Room Created", res);
    } catch (error) {
      socket.emit("Message", error);
    }
  });

  // Developer connect into a room
  socket.on("Connect Into a Room", async id => {
    try {
      //Verify if Exists the room
      if (mongoose.Types.ObjectId.isValid(id)) {
        const Room = await StoryModel.findById(id);
        if (Room !== null) {
          // Send the room data
          await socket.join(id);
          socket.emit("Room OK", Room);
          await io
            .in(id)
            .emit("UserJoinRoom", io.sockets.adapter.rooms[id].length);
        } else {
          socket.emit("Room BAD", "The Room was not find id");
        }
      } else {
        socket.emit("Room BAD", "The Room was not find id");
      }
    } catch (error) {
      socket.emit("Room BAD", error);
      console.log(error);
    }
  });
  socket.on("UserLeftRoom", async id => {
    socket.leave(id);
    await io.in(id).emit("UserJoinRoom", io.sockets.adapter.rooms[id].length);
  });
  socket.on("CloseRoom", async id => {
    let story = await StoryModel.findById(id);
    if (story) {
      story.active = false;
      await story.save();
      await io.in(id).emit("ClosedRoom", "This room was close");
    }
  });
  socket.on("ResetRoom", async id => {
    let story = await StoryModel.findById(id);
    if (story) {
      story.votes = [];
      await story.save();
      await io.in(id).emit("ResetedRoom", "Votes were Reset",story);
    }
  });
  socket.on("Vote", async (obj: any, id: string) => {
    const Room = await StoryModel.findById(id);
    if (Room) {
      Room.votes.push(obj)
      
      await Room.save()
      socket.emit("Voted","You have voted")
      await io.in(id).emit("RefreshVotes", Room);
    }else{
      socket.emit("Message","Error")
    }
  });

  //
  socket.on("disconnect", () => {});
});
