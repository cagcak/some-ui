import { Injectable } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LocalStorageService, UserService } from '../../services';
import {
  ChangeLanguage,
  RemoveUserProfile,
  SaveUserProfile,
  SignInUser,
  UpdateUserInfo,
} from '../actions';
import { Session } from '../models';

@State<Session.State>(Session.OPTIONS)
@Injectable({ providedIn: 'root' })
export class SessionState {
  constructor(
    private userService: UserService,
    private localStoregeService: LocalStorageService
  ) {}

  @Selector()
  static getUser({ user }: Session.State) {
    return user;
  }

  @Selector()
  static lang({ lang }: Session.State) {
    return lang;
  }

  @Action(SignInUser)
  signInUser(
    { patchState }: StateContext<Session.State>,
    { payload }: SignInUser
  ) {
    patchState({ user: payload });
  }

  @Action(SaveUserProfile)
  saveUserProfile(
    { getState, patchState }: StateContext<Session.State>,
    { payload: { id, email, name, password } }: SaveUserProfile
  ) {
    const { user } = getState();
    const userInfo =
      user ||
      (this.localStoregeService.getItem(
        'SessionState',
        'user'
      ) as Session.State);

    return (
      !userInfo &&
      this.userService.setUser({ id, email, name, password }).pipe(
        catchError((err) => throwError(err)),
        tap((signedInUser: Session.UserLogin) => {
          patchState({ user: signedInUser });
          this.localStoregeService.setItem('user', signedInUser);
        })
      )
    );
  }

  @Action(UpdateUserInfo)
  updateUserInfo(
    { patchState }: StateContext<Session.State>,
    { payload: { id, email, name, password } }: UpdateUserInfo
  ) {
    return this.userService.setUser({ id, email, name, password }).pipe(
      catchError((err) => throwError(err)),
      tap((signedInUser: Session.UserLogin) => {
        patchState({ user: signedInUser });
        this.localStoregeService.setItem('user', signedInUser);
      })
    );
  }

  @Action(RemoveUserProfile)
  removeUserProfile({ patchState, dispatch }: StateContext<Session.State>) {
    patchState({ user: null });
    this.localStoregeService.clear();
    dispatch(new Navigate(['/login']));
  }

  @Action(ChangeLanguage)
  changeLanguage(
    { patchState }: StateContext<Session.State>,
    { payload }: ChangeLanguage
  ) {
    patchState({ lang: payload });
  }
}
