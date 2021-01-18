import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { HomeComponent } from './components';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [SharedModule, HomeRoutingModule],
})
export class HomeModule {}
