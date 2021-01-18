import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ContactUsComponent } from './components';
import { ContactUsRoutingModule } from './contact-us-routing.module';

@NgModule({
  declarations: [ContactUsComponent],
  imports: [SharedModule, ContactUsRoutingModule],
})
export class ContactUsModule {}
