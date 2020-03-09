import RoomModel, { Room } from "../models/room.model";
import { isValidObjectId } from "mongoose";
class RoomController {
  async CreateRoom(room: Room) {
    let NewRoom = new RoomModel(room);
    let SavedRoom = await NewRoom.save();
    return await SavedRoom;
  }
  async ObtainRoomIfExists(id: string) {
    if (isValidObjectId(id)) {
      const Room = await RoomModel.findById(id);
      if (Room !== null) {
        return Room;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  async DesactivateRoom(room: Room) {
    room.active = false;
    return (await room.save()) ? true : false;
  }
  async ResetVotes(room: Room) {
    room.votes = [];
    return (await room.save()) ? true : false;
  }
  async AddVoteToRoom(room: Room, vote: any) {
    room.votes?.push(vote);
    return (await room.save()) ? true : false;
  }
  async SearchVote(room: Room, name: string) {
    let exist = false;
    let votes = <any[]>room.votes;
    for (let i = 0; i < votes.length; i++) {
      let vote = votes[i];
      if (vote?.name === name) {
        exist = true;
      }
    }
    return await exist;
  }
  async ReviewRoom(RoomID: string) {
    if (isValidObjectId(RoomID)) {
      let room = await RoomModel.findById(RoomID);
      return await room;
    } else {
      return null;
    }
  }
}
const roomcontroller = new RoomController();
export default roomcontroller;
