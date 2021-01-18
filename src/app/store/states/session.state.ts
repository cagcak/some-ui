import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LocalStorageService, UserService } from '../../services';
import { SaveUserProfile } from '../actions';
import { Session, SomeApp } from '../models';

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

  @Action(SaveUserProfile)
  saveUserProfile(
    { getState, patchState }: StateContext<SomeApp.State>,
    { payload: { id, email, name, password } }: SaveUserProfile
  ) {
    const { users } = getState();
    const user = this.localStoregeService.getItem(id) as SaveUserProfile;
    const isUserCache = users.find((_) => user && _.id === user.payload.id);

    return (
      !isUserCache &&
      this.userService.setUser({ id, email, name, password }).pipe(
        catchError((err) => throwError(err)),
        tap((response: SomeApp.User) => {
          patchState({ users: [...users, response] });
        })
      )
    );
  }
}
