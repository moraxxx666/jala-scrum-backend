import fetch from "node-fetch";
import config from "../config";

class TrelloAPIController {
  async GetBoards() {
    const res = await fetch(
      `https://api.trello.com/1/members/me/boards?key=${config.KEY_TRELLO}&token=${config.TOKEN_TRELLO}`
    );
    const res2 = await res.json();
    let boards: any[] = [];
    res2.forEach((el: any) => {
      let obj = {
        name: el.name,
        description: el.desc,
        IDBoard: el.id,
        lists: []
      };
      boards.push(obj);
    });
    return await boards;
  }
  async GetListFromBoard(IDBoard: any) {
    const res = await fetch(
      `https://api.trello.com/1/board/${IDBoard}/lists?key=${config.KEY_TRELLO}&token=${config.TOKEN_TRELLO}`
    );
    const res2 = await res.json();
    return await res2;
  }
  async GetCardsFromList(IDlist: any) {
    const res = await fetch(
      `https://api.trello.com/1/list/${IDlist}/cards?key=${config.KEY_TRELLO}&token=${config.TOKEN_TRELLO}`
    );
    const res2 = await res.json();
    let cards: any[] = [];
    res2.forEach((card: any) => {
      let obj = {
        id: card.id,
        name: card.name,
        description: card.desc
      };
      cards.push(obj);
    });
    return await cards;
  }
}

const trelloapicontroller = new TrelloAPIController();
export default trelloapicontroller;
