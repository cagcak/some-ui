import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngxs/store';
import { mapTo } from 'rxjs/operators';
import { GetUserProfiles } from '../store';

@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<null> {
  constructor(private store: Store) {}

  resolve() {
    return this.store.dispatch([new GetUserProfiles()]).pipe(mapTo(null));
  }
}
