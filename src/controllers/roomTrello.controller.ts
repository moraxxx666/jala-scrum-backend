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
}
const roomtrellocontroller = new RoomTrelloController();
export default roomtrellocontroller;
