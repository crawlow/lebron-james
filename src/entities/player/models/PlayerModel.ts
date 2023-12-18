export class PlayerModel {
  name: string;
  number: number;
  position: string;
  team: number;
  birthday: string;
  height: number;
  weight: number;
  avatarUrl: string;
  id: number;
  teamName: string;
  constructor(obj?: Partial<PlayerModel>) {
    if (obj) {
      Object.assign(this, obj);
    }
  }
}
