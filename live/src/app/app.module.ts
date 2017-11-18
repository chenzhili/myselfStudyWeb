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
import { ScreenOrientation } from '@ionic-native/screen-orientation'; //允许横屏
import { Device } from '@ionic-native/device';


//页面module
import { HomeModule } from '../pages/home/home.module';
//自定义
import { RepeatProvider } from '../providers/repeat/repeat';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HomeModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{  //初始化设置，这里面含有 commonModule这个里含有公共的 ngIf ngFor等公共指令的模块
      backButtonText: '', // 配置返回按钮的文字s
      tabsHideOnSubPages: 'true',
      iconMode: 'ios',
      mode: 'ios',
    }),
    IonicStorageModule.forRoot()  //只是为了在app中配置对应的存储功能的初始化，可以在任何组件中用 import { Storage } from "@ionic/storage"
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen, Camera, Network,InAppBrowser,ScreenOrientation,
    RepeatProvider,Device,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
