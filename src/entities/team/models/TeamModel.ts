export class TeamModel {
  name: string;
  foundationYear: number;
  division: string;
  conference: string;
  imageUrl: string;
  id?: number;
  constructor(obj?: Partial<TeamModel>) {
    if (obj) {
      Object.assign(this, obj);
    }
  }
}
