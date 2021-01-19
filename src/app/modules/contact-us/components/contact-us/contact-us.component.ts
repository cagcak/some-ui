import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { SessionState, SomeApp, SomeAppState, UpdateUserInfo } from '@store';

@Component({
  selector: 'app-contact-us',
  template: `
    <div fxFlexFill fxLayoutAlign="center center">
      <form [formGroup]="contactForm" *ngIf="contactForm.controls as f">
        <div fxLayoutGap="20px" fxLayout="row">
          <div fxLayout="column" fxLayoutAlign="space-around center">
            <mat-form-field>
              <mat-label>Name</mat-label>
              <input matInput type="name" formControlName="name" />
            </mat-form-field>
            <mat-form-field>
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" />
            </mat-form-field>
          </div>
        </div>
        <button mat-raised-button color="warn" (click)="submit()">
          {{ 'Save' | translate }}
        </button>
      </form>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    const user = this.store.selectSnapshot(SessionState.getUser);
    const userInfo = this.store.selectSnapshot(
      SomeAppState.getUser(user.email)
    );

    this.contactForm = this.fb.group({
      id: [userInfo.id],
      name: [userInfo.name],
      email: [userInfo.email],
      phonenumber: [userInfo.phonenumber],
      countryCode: [userInfo.countryCode],
      text: [userInfo.text],
    });
  }

  submit(): void {
    if (this.contactForm.invalid) return;

    const { email, name } = this.contactForm.value as SomeApp.User;

    this.store
      .dispatch(new UpdateUserInfo({ email, name }))
      .subscribe(console.log);
  }
}
