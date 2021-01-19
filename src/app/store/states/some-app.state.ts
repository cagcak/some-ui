import { Injectable } from '@angular/core';
import {
  Action,
  createSelector,
  Selector,
  State,
  StateContext,
} from '@ngxs/store';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserService } from '../../services';
import { GetUserProfiles } from '../actions';
import { SomeApp } from '../models';

@State<SomeApp.State>(SomeApp.OPTIONS)
@Injectable({ providedIn: 'root' })
export class SomeAppState {
  constructor(private userService: UserService) {}

  @Selector()
  static getUsers({ users }: SomeApp.State) {
    return users;
  }

  static getUserInfo(field: keyof SomeApp.User, userId: number) {
    return createSelector([SomeAppState], ({ users }: SomeApp.State) => {
      if (!field || isNaN(userId)) return;

      return users.find((user) => user.id === userId)[field];
    });
  }

  static getUser(email: string) {
    return createSelector([SomeAppState], ({ users }: SomeApp.State) => {
      if (!email) return;

      return users.find((user) => user.email === email);
    });
  }

  @Action(GetUserProfiles)
  getUserProfiles({ patchState }: StateContext<SomeApp.State>) {
    return this.userService.getUsers().pipe(
      catchError((err) => throwError(err)),
      tap((users: SomeApp.User[]) => patchState({ users }))
    );
  }
}
