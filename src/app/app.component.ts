import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterState } from '@ngxs/router-plugin';
import { Select } from '@ngxs/store';
import { ColorSchemeService } from '@shared';
import { Observable } from 'rxjs';
import { Layout } from './modules/shared/models';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-layout">
      <mat-toolbar color="primary">
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
          <app-color-schema></app-color-schema>
          <app-language-exchange></app-language-exchange>
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
          <div class="footer-layout">
            <app-footer></app-footer>
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  @Select(RouterState)
  url$: Observable<string>;

  title = 'some-ui';

  menuItems: Layout.Link[] = [
    {
      iconLabel: 'Home',
      iconName: 'home',
      linkHref: '/',
    },
    {
      iconLabel: 'Profile',
      iconName: 'user',
      linkHref: '/profile',
    },
    {
      iconLabel: 'Contact US',
      iconName: 'account_box',
      linkHref: '/contact-us',
    },
  ];

  constructor(private colorSchemeService: ColorSchemeService) {
    this.colorSchemeService.load();
  }
}
