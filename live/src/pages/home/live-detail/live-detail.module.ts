import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LiveDetailPage } from './live-detail';
import { ImgLazyLoadComponentModule } from '../../../components/img-lazy-load/img-lazy-load.module';
@NgModule({
  declarations: [
    LiveDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(LiveDetailPage),
    ImgLazyLoadComponentModule
  ],
})
export class LiveDetailPageModule {}
