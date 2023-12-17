import { PlayerModel } from '@/entities/player';
import { TeamModel } from './TeamModel';

export class TeamDetailsModel extends TeamModel {
  players: Array<PlayerModel>;
  constructor(obj?: Partial<TeamDetailsModel>) {
    if (obj) {
      super(obj);
      Object.assign(this, obj);
    }
  }
}
