import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExchangePage } from './exchange';
import { ExchangeDetailComponent } from "./exchange-detail/exchange-detail";

@NgModule({
  declarations: [
    ExchangePage,ExchangeDetailComponent
  ],
  imports: [
    IonicPageModule.forChild(ExchangePage),
  ],
  entryComponents:[
    ExchangeDetailComponent
  ],
  exports:[
    ExchangePage,ExchangeDetailComponent
  ]
})
export class ExchangePageModule {}
