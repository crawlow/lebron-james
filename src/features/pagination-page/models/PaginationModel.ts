export class PaginationModel {
  page: number;
  count: number;
  size: number;
  constructor(obj?: Partial<PaginationModel>) {
    if (obj) {
      Object.assign(this, obj);
    }
  }
}
