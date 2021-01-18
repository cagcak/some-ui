import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Session, SessionState } from 'src/app/store';

@Component({
  selector: 'app-profile',
  template: ` <p>profile works!</p> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  @Select(SessionState.getUser)
  user$: Observable<Session.UserLogin>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    console.log(this);
    this.user$.subscribe(console.log);
  }
}
