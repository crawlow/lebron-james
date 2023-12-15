export class UserModel {
  avatarUrl: string;
  name: string;
  token: string;
  constructor(obj?: Partial<UserModel>) {
    if (obj) {
      Object.assign(this, obj);
    }
  }
}
