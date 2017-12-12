/*简化的路由*/
(function(){
    function getUrl(url){
        let tempObj = {};
        tempObj.route  = url.split("?")[0].substring(1);
        return tempObj;
    }
    function Router(){
        this.route = "";
        this.registerRoute = {};
        this.append = 0;
    }
    Router.prototype = {
        init:function(){
            let me = this;
            window.addEventListener("load",function(){
                me.route = getUrl(location.hash);
                me.routeChange();
            });
            window.addEventListener("hashchange",function(){
                me.route = getUrl(location.hash);
                me.routeChange();
            });
        },
        //注册路由
        register:function(route){
            let me = this;
            me.registerRoute[route] = route;
        },
        //路由改变执行的函数
        routeChange:function(){
            if(this.registerRoute[this.route.route]){
                this.asyncLoad();
            }else{
                //重定向到默认路由
                location.href = "index.html#first";
                this.asyncLoad();
            }
        },
        asyncLoad:function(){
            let body = document.getElementsByTagName("body")[0];
            let append = document.getElementsByClassName("append")[0];
            append && document.body.removeChild(append);
            let script = document.createElement("script");
            script.src = `${this.registerRoute[this.route.route]}.js`;
            script.async = true;
            script.className = "append";
            this.registerRoute[this.route.route] && body.appendChild(script);
        }
    };
    if(!window.router){
        window.router = new Router();
    }
})();
router.register("first");
router.register("detail");

router.init();