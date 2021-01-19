import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  ColorSchemaComponent,
  ErrorComponent,
  FooterComponent,
  LanguageExchangeComponent,
  NavLinkComponent,
} from './components';
import { PhonePipe } from './pipes';

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
  MatSnackBarModule,
];

export const COMPONENTS = [
  ErrorComponent,
  ColorSchemaComponent,
  NavLinkComponent,
  LanguageExchangeComponent,
  FooterComponent,
];

export const PIPES = [PhonePipe];
