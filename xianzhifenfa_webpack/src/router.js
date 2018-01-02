/**
 * Created by YK on 2017/12/29.
 */
(function(){
    function getUrl(url){
        let tempObj = {};
        tempObj.route  = url.split("?")[0].substring(1);
        return tempObj;
    }
    function getHTML(url){
        return new Promise(function(resolve,reject){
            $.ajax({
                async:false,
                url: url,
                processData: false,
                success: function (data) {
                    resolve(data);
                },
                error: function (data) {
                    reject(data);
                }
            });
        });
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
                location.href = "#entry";
                this.route.route = "entry";
                this.asyncLoad();
            }
        },
        asyncLoad:function(){
            getHTML(`${this.registerRoute[this.route.route]}/${this.registerRoute[this.route.route]}.html`)
                .then(data=>{
                    $(".router_container").html(data);
                    let script = document.getElementsByClassName("router_script")[0];
                    script.src = `${this.registerRoute[this.route.route]}/${this.registerRoute[this.route.route]}.js`;
                    script.async = true;
                }).catch(err=>{
                console.log(err);
            });
        }
    };
    module.exports = new Router();
})();