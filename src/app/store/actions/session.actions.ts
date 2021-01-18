import { Session } from '../models';

export class SaveUserProfile {
  static readonly type = '[SaveUserProfile] Save User Profile';
  constructor(public payload: Session.UserLogin) {}
}
