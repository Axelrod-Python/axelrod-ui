
import Argument from './argument';

export interface IContestObject {
  id: number;
  name: string;
  description: string;
  max_players: number;
  min_players: number;
  params: {
    [key: string]: any;
  };
}

export default class Contest {

  public id: number;
  public name: string;
  public description: string;
  public maxPlayers: number;
  public minPlayers: number;
  public params: Argument[];

  constructor({ id, name, description, max_players, min_players, params }: IContestObject) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.maxPlayers = max_players;
    this.minPlayers = min_players;
    const paramList: Argument[] = [];
    // tslint:disable-next-line:prefer-const
    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        paramList.push(new Argument(key, params[key]));
      }
    }
    this.params = paramList;
  }
}
