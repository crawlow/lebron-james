export class SelectOptionModel {
  value: number;
  name: string;
  constructor(obj?: Partial<SelectOptionModel>) {
    if (obj) {
      Object.assign(this, obj);
    }
  }
}
