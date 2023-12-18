import { TeamModel } from './TeamModel';

export class TeamListModel {
  count?: number;
  teams: Array<TeamModel>;
  constructor(obj?: Partial<TeamListModel>) {
    if (obj) {
      Object.assign(this, obj);
    }
  }
}
