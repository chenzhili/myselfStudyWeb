import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CountDownComponent } from './count-down';

@NgModule({
  declarations: [
    CountDownComponent,
  ],
  imports: [
    IonicPageModule.forChild(CountDownComponent),
  ],
  exports: [
    CountDownComponent
  ]
})
export class CountDownComponentModule {}
