export class AuthModel {
  login: string;
  password: string;
  constructor(obj?: Partial<AuthModel>) {
    if (obj) {
      Object.assign(this, obj);
    }
  }
}
