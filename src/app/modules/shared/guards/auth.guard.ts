import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { SessionState } from 'src/app/store';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isAuthenticatedUser = this.store.selectSnapshot(SessionState.getUser);

    this.router.events.pipe(take(1)).subscribe((event) => {
      const passedFlow = state.url.match(/(regiter|login)/g) || '';

      if (isAuthenticatedUser && passedFlow.length) {
        return true;
      } else if (!isAuthenticatedUser) {
        this.router.navigate(['/login']);
      } else {
        return true;
      }
    });

    return true;
  }
}
