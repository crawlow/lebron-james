export class ErrorModel {
  img: string;
  title: string = 'Empty here';
  description: string;
  constructor(obj?: Partial<ErrorModel>) {
    if (obj) {
      Object.assign(this, obj);
    }
  }
}
