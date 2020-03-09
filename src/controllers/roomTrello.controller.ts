import TrelloRoomModel from "../models/roomTrello.model";
class RoomTrelloController {
  async CreateTrelloRoom(cards: any[], IDList: string) {
    let ExistRoom = await TrelloRoomModel.findOne({ IDList });
    if (ExistRoom !== null) {
      ExistRoom.stories = cards;
      await ExistRoom.save();
      return await ExistRoom;
    } else {
      let NewRoom = new TrelloRoomModel({
        stories: cards,
        IDList: IDList
      });
      return (await NewRoom.save()) ? NewRoom : null;
    }
  }
  async ChangeCurrentStorie(storie: any, IDList: string) {
    const room = await TrelloRoomModel.findOne({ IDList });
    if (room) {
      room.currentStorie = storie;
      await room.save();
      return await room;
    } else {
      return null;
    }
  }
  async VerifyVote(IDList: string, IDcard: string, name: string) {
    let room = await TrelloRoomModel.findOne({ IDList });
    let votes = room?.votes?.filter(
      (vote: any, index) => vote?.name === name && vote?.IDStorie === IDcard
    );
    if (votes) {
      return (await votes?.length) > 0 ? true : false;
    } else return false;
  }
  async Vote(IDList: string, IDcard: string, name: string, vote: any) {
    let room = await TrelloRoomModel.findOne({ IDList });
    if (room) {
      room.votes?.push({
        IDStorie: IDcard,
        name: name,
        vote
      });
      await room.save();
      return await room;
    } else return null;
  }
  async ResetVotes(IDList: string, IDcard: string) {
    let room = await TrelloRoomModel.findOne({ IDList });
    if (room) {
      let NotTheVotes = room.votes?.filter((el: any) => el.IDStorie !== IDcard);
      room.votes = NotTheVotes;
      await room.save();
      return await room;
    } else return null;
  }
}
const roomtrellocontroller = new RoomTrelloController();
export default roomtrellocontroller;
