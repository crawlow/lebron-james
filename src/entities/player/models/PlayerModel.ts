export class PlayerModel {
  name: string;
  number: Number;
  position: string;
  team: Number;
  birthday: Date;
  height: Number;
  weight: Number;
  avatarUrl: string;
  id: Number;
  teamName: string;
  constructor(obj?: Partial<PlayerModel>) {
    if (obj) {
      Object.assign(this, obj);
    }
  }
}
