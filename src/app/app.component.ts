import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { ColorSchemeService } from '@shared';
import { Observable } from 'rxjs';
import { Layout } from './modules/shared/models';
import { RemoveUserProfile, Session, SessionState } from './store';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-layout">
      <mat-toolbar color="primary" *ngIf="user$ | async">
        <mat-toolbar-row>
          <button
            mat-icon-button
            (click)="sidenav.toggle()"
            fxShow="true"
            fxHide.gt-sm
          >
            <mat-icon>menu</mat-icon>
          </button>
          <span>{{ title | translate | titlecase }}</span>
          <span class="spacer"></span>
          <div fxShow="true" fxHide.lt-md="true">
            <ng-container *ngFor="let item of menuItems">
              <app-nav-link
                [iconName]="item.iconName"
                [iconLabel]="item.iconLabel"
                [linkHref]="item.linkHref"
              ></app-nav-link>
            </ng-container>
          </div>
          <app-color-schema fxLayoutGap="20px"></app-color-schema>
          <app-language-exchange fxLayoutGap="20px"></app-language-exchange>
          <button mat-icon-button [matMenuTriggerFor]="menu">
            <mat-icon>more_vert</mat-icon>
          </button>
          <mat-menu #menu="matMenu">
            <button mat-menu-item (click)="logout()">
              <mat-icon>exit_to_app</mat-icon>
              {{ 'Sign out' | translate }}
            </button>
          </mat-menu>
        </mat-toolbar-row>
      </mat-toolbar>
      <mat-sidenav-container>
        <mat-sidenav #sidenav>
          <mat-nav-list>
            <ng-container *ngFor="let item of menuItems">
              <app-nav-link
                [isWideScreen]="false"
                [iconName]="item.iconName"
                [iconLabel]="item.iconLabel"
                [linkHref]="item.linkHref"
              ></app-nav-link>
            </ng-container>
          </mat-nav-list>
        </mat-sidenav>
        <mat-sidenav-content>
          <div class="content-layout">
            <router-outlet></router-outlet>
          </div>
          <div class="footer-layout" *ngIf="user$ | async">
            <app-footer></app-footer>
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  @Select(SessionState.getUser)
  user$: Observable<Session.UserLogin>;

  title = 'some-ui';

  menuItems: Layout.Link[] = [
    {
      iconLabel: 'Home',
      iconName: 'home',
      linkHref: '/',
    },
    {
      iconLabel: 'Profile',
      iconName: 'account_circle',
      linkHref: '/profile',
    },
    {
      iconLabel: 'Contact Us',
      iconName: 'account_box',
      linkHref: '/contact-us',
    },
  ];

  constructor(
    private colorSchemeService: ColorSchemeService,
    private translate: TranslateService,
    private store: Store
  ) {
    this.colorSchemeService.load();
    this.setLang();
  }

  private setLang(): void {
    this.translate.addLangs(['en-US', 'tr-TR']);

    const state = JSON.parse(
      window.localStorage.getItem('SessionState')
    ) as Session.State;

    this.translate.use((state && state.lang) || 'en-US');
  }

  logout(): void {
    this.store.dispatch(new RemoveUserProfile());
  }
}
