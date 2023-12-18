import { PlayerModel } from './PlayerModel';

export class PlayerListModel {
  count?: number;
  players: Array<PlayerModel>;
  constructor(obj?: Partial<PlayerListModel>) {
    if (obj) {
      Object.assign(this, obj);
    }
  }
}
