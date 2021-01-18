import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  ColorSchemaComponent,
  FooterComponent,
  LanguageExchangeComponent,
  NavLinkComponent,
} from './components';

export const MATERIAL_MODULES = [
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatSidenavModule,
  MatToolbarModule,
  MatCardModule,
  MatMenuModule,
  MatSelectModule,
];

export const COMPONENTS = [
  ColorSchemaComponent,
  NavLinkComponent,
  LanguageExchangeComponent,
  FooterComponent,
];
