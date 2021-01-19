import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import {
  GeneralErrorStateMatcher,
  PasswordFormErrorStateMatcher,
  PASSWORD_REGEX,
} from '@shared';
import { SignInUser, SomeAppState } from 'src/app/store';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  userLoginForm: FormGroup;
  errorState: GeneralErrorStateMatcher;
  passwordErrorState: PasswordFormErrorStateMatcher;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.userLoginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [Validators.required, Validators.pattern(PASSWORD_REGEX)],
      ],
    });

    this.errorState = new GeneralErrorStateMatcher();
    this.passwordErrorState = new PasswordFormErrorStateMatcher();
  }

  submit(): void {
    const userEmail = this.userLoginForm.get('email').value;
    const user = this.store.selectSnapshot(SomeAppState.getUser(userEmail));

    if (user) {
      this.store.dispatch([new SignInUser(user), new Navigate(['/'])]);
    } else {
      this.openSnackBar('User not found', 'error');
    }
  }

  goToRegister(): void {
    this.store.dispatch(new Navigate(['/register']));
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 7000,
    });
  }
}
