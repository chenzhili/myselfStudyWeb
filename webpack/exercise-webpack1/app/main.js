/*var greeter = require('./Greeter.js');
document.getElementById('root').appendChild(greeter());*/
import { fun } from "./Greeter.js"

/*import "./main1.css";*/ 
document.getElementById('root').appendChild(fun());
 


 



// webpack的用法 （webpack只需要一个引入接口文件，通过此对于所有的有关文件作出对应的操作打包之类）
/***********其实就是对于现在的模块化开发的需求开发出来，这个接口文件会对先关的文件进行相关的操作
	它支持AMD和CommonJS，以及其他的模块系统(Angular, ES6)。如果你不太熟悉如何使用，就用CommonJS吧。

	特别对应当前我看的angular2来说中的路由，加载的时候，只会加载对应路由下的文件，不会加载所有的代码，这个按需加载让文件变得更加小，优化性更好
**********************/ 
/*  webpack 开发环境下编译
	webpack -p 产品编译及压缩
	webpack --watch 开发环境下持续的监听文件变动来进行编译(非常快!)
	webpack -d 引入 source maps*/
