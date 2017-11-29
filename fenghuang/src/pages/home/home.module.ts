import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { ExchangePageModule } from "../exchange/exchange.module";
@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    ExchangePageModule
  ],
  entryComponents: [
    HomePage
  ],
  exports: [
    HomePage
  ]
})
export class HomeModule { }
