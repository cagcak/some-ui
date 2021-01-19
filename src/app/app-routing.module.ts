import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, ErrorComponent } from '@shared';
import {
  LoginComponent,
  ProfileComponent,
  RegisterComponent,
} from './components';
import { UserResolver } from './resolvers';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    resolve: {
      fetchedUsers: UserResolver,
    },
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfileComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    resolve: {
      fetchedUsers: UserResolver,
    },
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'contact-us',
    canActivate: [AuthGuard],
    resolve: {
      fetchedUsers: UserResolver,
    },
    loadChildren: () =>
      import('./modules/contact-us/contact-us.module').then(
        (m) => m.ContactUsModule
      ),
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: '**',
    redirectTo: '/error',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
