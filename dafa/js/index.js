(function($){
    var project = {
        init:function(){
            this.firstAdv = $(".first_adv");
            this.secondeAdv = $(".second_adv");
            this.code = $(".code");
            this.ios = $(".ios");
            this.android = $(".android");
            this.newsDetail = $(".new_detail");
            this.advObj = {};
            this._init();
        },
        render:function(){
            var me = this;
            this.firstAdv.click($.proxy(me["_do"],me));
            this.secondeAdv.click($.proxy(me["_do"],me));
            this.newsDetail.click($.proxy(me["_doToNews"],me));
        },
        _do:function(e){
            var me = this;
            var advRegF = /first/g,advRegS = /second/g;
            var parent = e.target.parentNode;
            if(advRegF.test(parent.className)){
                me.advObj.top && window.open(me.advObj.top.url);
            }
            if(advRegS.test(parent.className)){
                me.advObj.bottom && window.open(me.advObj.bottom.url);
            }
        },
        _doToNews:function(e){
            var newsReg = /new_detail_item/g;
            if(newsReg.test(e.target.className)){
                location.href = "news.html?id="+e.target.className.split(" ")[1].substring(1);
            }
            if(e.target.nodeName == "P"){
                location.href = "news.html?id="+e.target.parentNode.className.split(" ")[1].substring(1);
            }
        },
        _init:function(){
            var me = this;
            ajax("index/banner").then(function(data){
                me.advObj = data;
                if(me.advObj.top){
                    $(".first_adv img")[0].src = me.advObj.top.cover;
                }
                if(me.advObj.bottom){
                    $(".second_adv img")[0].src = me.advObj.bottom.cover;
                }
                me.render();
            }).catch(function(err){
                console.log(err);
            });
            ajax("index/package").then(function(data){
                if(data.QR_code){
                    me.code[0].src = data.QR_code;
                    me.code.height(me.code.width());
                }
                data.Ios && me.ios.attr("href",me.ios);
                data.Android && me.android.attr("href",me.android);
            }).catch(function(err){
                console.log(err);
            });
            ajax("Article/lists").then(function(data){
                if(data.length){
                    var fregment = document.createDocumentFragment();
                    for(var i=0;i<data.length;i++){
                        var div = document.createElement("div");
                        div.className = "new_detail_item "+"i"+data[i].id;
                        div.innerHTML =
                            data[i].title+
                            "<p>"+
                            data[i].subtitle+
                            "</p>";
                        fregment.appendChild(div);
                    }
                    me.newsDetail[0].appendChild(fregment);
                }
            }).catch(function(err){
                console.log(err);
            });
        }
    };
    $(document).ready(function(){
        project.init();
    });
})($);