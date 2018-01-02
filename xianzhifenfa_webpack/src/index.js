/**
 * Created by YK on 2017/12/28.
 */
/*引入router*/
import router from "./router";
/*加载的css*/
import "./index.scss";
/*加载的图片*/
import logo from "./img/logo.png";
import kf from "./img/kf.png";
import tel from "./img/tel.png";

(function($){
    /*注册路由*/
    router.register("entry");
    router.register("ASO");
    router.register("ground");
    router.register("assign");


    /*初始化路由*/
    router.init();
})($);