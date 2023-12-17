import { PaginationModel } from '@/features';

export class FilterTeamsModel {
  search: string;
  page: PaginationModel = new PaginationModel();
  constructor(obj?: Partial<FilterTeamsModel>) {
    if (obj) {
      Object.assign(this, obj);
    }
  }
}
