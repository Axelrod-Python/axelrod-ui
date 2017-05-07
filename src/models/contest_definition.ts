
export interface IDefinitionObject {
  created: string;
  last_updated: string;
  turns: number;
  noise: number;
  player_list: string[];
}

export default class Definition {

  public created: Date;
  public updated: Date;
  public turns: number;
  public noise: number;
  public playerList: string[];
  public other: any;

  constructor({ created, last_updated, turns, noise, player_list, ...other }: IDefinitionObject) {
    this.created = new Date(created);
    this.updated = new Date(last_updated);
    this.turns = turns;
    this.noise = noise;
    this.playerList = player_list;
    this.other = { ...other };
  }
}
