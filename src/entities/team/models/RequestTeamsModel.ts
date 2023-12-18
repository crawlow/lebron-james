import { PaginationModel } from '@/features';

export class RequestTeamsModel {
  search: string;
  page: PaginationModel = new PaginationModel();
  constructor(obj?: Partial<RequestTeamsModel>) {
    if (obj) {
      Object.assign(this, obj);
    }
  }
}
