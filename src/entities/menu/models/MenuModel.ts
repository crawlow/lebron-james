export class MenuModel {
  icon: string;
  name: string;
  routeName: string;
  constructor(obj?: Partial<MenuModel>) {
    if (obj) {
      Object.assign(this, obj);
    }
  }
}
