import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { COMPONENTS, MATERIAL_MODULES, PIPES } from './imports';

@NgModule({
  declarations: [...COMPONENTS, ...PIPES],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule,
    FlexLayoutModule,
    ...MATERIAL_MODULES,
  ],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule,
    FlexLayoutModule,
    ...MATERIAL_MODULES,
    ...COMPONENTS,
    ...PIPES,
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
})
export class SharedModule {}
