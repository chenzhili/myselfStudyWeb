import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';/*这是动态引导*/

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);


//这是aot方式的静态引导浏览器启动方式有点
/*
1、因为是预先编译好，不需要向浏览器传输Angular的编译器，所以传输的内容更小。
2、和动态引导需要在浏览器端即时编译不同，静态引导从服务端下载完代码后可即时启动，启动比较快。
*/
/*import { platformBrowser } from '@angular/platform-browser';
import { AppModuleNgFactory } from './app.module.ngfactory';

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);*/

/*认为angular2相比于angular1的优势*/
/*
* 1、通过模块加载的，按需加载需要的模块，不需要把所有的框架js都加载到项目中，用到什么加载什么
* */
