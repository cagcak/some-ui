import { Session } from '../models';

export class SaveUserProfile {
  static readonly type = '[SaveUserProfile] Save User Profile';
  constructor(public payload: Session.UserLogin) {}
}

export class UpdateUserInfo {
  static readonly type = '[UpdateUserInfo] Update User Info';
  constructor(public payload: Session.UserLogin) {}
}

export class RemoveUserProfile {
  static readonly type = '[RemoveUserProfile] Remove User Profile';
}

export class ChangeLanguage {
  static readonly type = '[ChangeLanguage] Change Language';
  constructor(public payload: Session.AppLanguages) {}
}

export class SignInUser {
  static readonly type = '[SignInUser] Sign In User';
  constructor(public payload: Session.UserLogin) {}
}
