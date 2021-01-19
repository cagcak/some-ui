import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import {
  GeneralErrorStateMatcher,
  NAME_REGEX,
  PasswordFormErrorStateMatcher,
  PASSWORD_REGEX,
  PHONE_REGEX,
} from '@shared';
import { SaveUserProfile, Session } from '../../store';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent implements OnInit {
  userRegisterForm: FormGroup;
  errorState: GeneralErrorStateMatcher;
  passwordErrorState: PasswordFormErrorStateMatcher;

  selectedCountry: string;
  countryList = [
    { id: 'TR', code: '90', name: 'Turkey' },
    { id: 'US', code: '1', name: 'United States of America' },
    { id: 'GB', code: '44', name: 'United Kingdom' },
    { id: 'DE', code: '45', name: 'Germany' },
    { id: 'SE', code: '46', name: 'Sweden' },
    { id: 'KE', code: '254', name: 'Kenya' },
    { id: 'BR', code: '55', name: 'Brazil' },
    { id: 'ZW', code: '263', name: 'Zimbabwe' },
  ];

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.userRegisterForm = this.fb.group({
      name: [null, [Validators.required, Validators.pattern(NAME_REGEX)]],
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [Validators.required, Validators.pattern(PASSWORD_REGEX)],
      ],
      phone: [null, [Validators.pattern(PHONE_REGEX)]],
      countryCode: [null],
    });

    this.errorState = new GeneralErrorStateMatcher();
    this.passwordErrorState = new PasswordFormErrorStateMatcher();
  }

  submit(): void {
    if (this.userRegisterForm.invalid) return;

    const { email, name, id } = this.userRegisterForm
      .value as Session.UserLogin;

    this.store
      .dispatch(new SaveUserProfile({ email, name, id }))
      .subscribe(() => {
        this.store.dispatch(new Navigate(['/']));
      });
  }

  goToLogin(): void {
    this.store.dispatch(new Navigate(['/login']));
  }
}
