import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Session, SessionState } from 'src/app/store';

@Component({
  selector: 'app-profile',
  template: `
    <h3>{{ 'User Profile' | translate }}</h3>
    <mat-list role="list" *ngIf="{ user: user$ | async } as data">
      <mat-list-item *ngFor="let item of entries(data.user)" role="listitem">
        {{ item[0] | translate | titlecase }}: {{ item[1] }}
      </mat-list-item>
    </mat-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  @Select(SessionState.getUser)
  user$: Observable<Session.UserLogin>;

  entries(object: Session.UserLogin) {
    return Object.entries(object);
  }
}
