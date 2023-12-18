export class FilterPlayersModel {
  name: string;
  teamIds: Array<number>;
  constructor(obj?: Partial<FilterPlayersModel>) {
    if (obj) {
      Object.assign(this, obj);
    }
  }
}
