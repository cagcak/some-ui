import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorComponent } from './components';
import { COMPONENTS, MATERIAL_MODULES } from './imports';

@NgModule({
  declarations: [ErrorComponent, ...COMPONENTS],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    FlexLayoutModule,
    ...MATERIAL_MODULES,
  ],
  exports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    FlexLayoutModule,
    ...MATERIAL_MODULES,
    ...COMPONENTS,
  ],
})
export class SharedModule {}
