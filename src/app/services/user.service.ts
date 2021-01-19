import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Session, SomeApp } from '../store';

type UserLogin = SomeApp.User & Session.UserLogin;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private REST_API_SERVER = 'http://localhost:3000/users';

  private error = 'Please start mock server by `yarn server`';

  constructor(private httpClient: HttpClient) {}

  public getUsers() {
    return this.httpClient
      .get(this.REST_API_SERVER)
      .pipe(catchError((e) => throwError(this.error)));
  }

  public setUser(user: UserLogin) {
    return this.httpClient
      .post(this.REST_API_SERVER, user)
      .pipe(catchError((e) => throwError(this.error)));
  }
}
