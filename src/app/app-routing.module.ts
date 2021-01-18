import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared';
import { ProfileComponent } from './components';
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
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // providers: [UserResolver],
})
export class AppRoutingModule {}
