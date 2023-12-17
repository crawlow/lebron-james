export class BreadcrumbsModel {
  text: string;
  to?: string;
  constructor(obj?: Partial<BreadcrumbsModel>) {
    if (obj) {
      Object.assign(this, obj);
    }
  }
}
