import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { ImgLazyLoadComponentModule } from '../../components/img-lazy-load/img-lazy-load.module';
import { LiveDetailPageModule } from './live-detail/live-detail.module';
@NgModule({
  declarations: [
    HomePage ,
  ],
  imports: [
    IonicPageModule.forChild(HomePage ),
    ImgLazyLoadComponentModule,
    LiveDetailPageModule
  ],
  entryComponents: [
    HomePage ,
  ],
  exports: [
    HomePage 
  ]
})
export class HomeModule { }
