import { AuthModel } from './AuthModel';

export class RegisterModel extends AuthModel {
  name: string;
  constructor(obj?: Partial<AuthModel>) {
    super(obj);
    if (obj) {
      Object.assign(this, obj);
    }
  }
}
