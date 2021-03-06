import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';

//插件
import { IonicStorageModule } from '@ionic/storage'; //存储
import { Camera } from '@ionic-native/camera';  //相机
import { Network } from '@ionic-native/network'; //网络
import { InAppBrowser } from '@ionic-native/in-app-browser'; //打开浏览器

//页面module
import { HomeModule } from '../pages/home/home.module';

//自定义
// import { RepeatProvider } from '../providers/repeat/repeat';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HomeModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: '', // 配置返回按钮的文字
      backButtonIcon: 'assets/image/back.png',
      iconMode: 'ios',
      mode: 'ios',
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen, Camera, Network,InAppBrowser,
    // RepeatProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
