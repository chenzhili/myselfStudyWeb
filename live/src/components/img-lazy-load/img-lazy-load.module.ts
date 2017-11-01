import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImgLazyLoadComponent } from './img-lazy-load';
@NgModule({
  declarations: [
    ImgLazyLoadComponent,
  ],
  imports: [
    IonicPageModule.forChild(ImgLazyLoadComponent),
  ],
  exports: [
    ImgLazyLoadComponent
  ]
})
export class ImgLazyLoadComponentModule {}
