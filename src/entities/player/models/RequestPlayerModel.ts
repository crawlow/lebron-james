export class RequestPlayerModel {
  name?: string;
  teamIds?: Array<number>;
  page?: number;
  pageSize?: number;
  constructor(obj?: Partial<RequestPlayerModel>) {
    if (obj) {
      Object.assign(this, obj);
    }
  }
}
