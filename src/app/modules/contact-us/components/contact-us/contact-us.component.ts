import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SomeApp, SomeAppState } from 'src/app/store';

@Component({
  selector: 'app-contact-us',
  template: ` <p>contact-us works!</p> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactUsComponent implements OnInit {
  @Select(SomeAppState.getUsers)
  users$: Observable<SomeApp.User[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    console.log(this);
    this.users$.subscribe(console.log);
  }
}
