import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Session, SomeApp } from '../store';

type UserLogin = SomeApp.User & Session.UserLogin;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private REST_API_SERVER = 'http://localhost:3000/users';

  constructor(private httpClient: HttpClient) {}

  public getUsers() {
    return this.httpClient.get(this.REST_API_SERVER);
  }

  public setUser(user: UserLogin) {
    return this.httpClient.post(this.REST_API_SERVER, user);
  }
}
