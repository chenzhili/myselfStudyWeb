(function($){
    var project = {
        init:function(){
            this.firstAdv = $(".first_adv");
            this.secondeAdv = $(".second_adv");
            this.left = $(".adv_24_left");
            this.right = $(".adv_24_right");
            this.pop = $(".weibo");
            this.latestNews = $(".latest_news");
            this.newsMessage = $(".news_message");
            this.toNewNews = $(".to_new_news");
            this.advObj = {};
            this.newsDetail = {};
            this.initId = location.href.split("?")[1].substring(3);
            this._init();
        },
        render:function(){
            var me = this;
            this.firstAdv.click($.proxy(me["_do"],me));
            this.secondeAdv.click($.proxy(me["_do"],me));
            this.left.click($.proxy(me["_do"],me));
            this.right.click($.proxy(me["_do"],me));
            this.toNewNews.click($.proxy(me["_doToNews"],me));
        },
        _do:function(e){
            var me = this;
            var advRegF = /first/g,advRegS = /second/g,advLeft = /adv_24_left/g,advRight = /adv_24_right/g;
            var parent = e.target.parentNode;
            if(advRegF.test(parent.className)){
                me.advObj.top && window.open(me.advObj.top.url);
            }
            if(advRegS.test(parent.className)){
                me.advObj.bottom && window.open(me.advObj.bottom.url);
            }
            if(advLeft.test(e.target.className)){
                me.advObj.left && window.open(me.advObj.left.url);
            }
            if(advRight.test(e.target.className)){
                me.advObj.right && window.open(me.advObj.right.url);
            }
        },
        _doToNews:function(e){
            if(e.target.nodeName == "A"){
                location.href = "news.html?id="+e.target.className.substring(1);
            }
            if(e.target.nodeName == "SPAN"){
                location.href = "news.html?id="+e.target.parentNode.className.substring(1);
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
                if(me.advObj.left){
                    $(".adv_24_left")[0].src = me.advObj.left.cover;
                }
                if(me.advObj.right){
                    $(".adv_24_right")[0].src = me.advObj.right.cover;
                }
                me.render();
            }).catch(function(err){
                console.log(err);
            });
            ajax("Article/index").then(function(data){
                me.popular = data.weibo;
                me.latest = data.news;
                me.fun().repeatPopular(me.popular,"news_weibo_item","hot",me.pop);
                me.fun().repeatPopular(me.latest,"news_weibo_item","latest_news",me.latestNews,1);
                $(".news_weibo_item").click(function(){
                    location.href = "news.html?id="+this.className.split(" ")[1].substring(1);
                });
            }).catch(function(err){
                console.log(err);
            });
            ajax("Article/edit",{id:me.initId}).then(function(data){
                me.newsDetail = data;
                me.newsMessage[0].innerHTML = '' +
                    '<div class="message_title">' +
                    me.newsDetail.article.title +
                    '</div>' +
                    '<div class="message_author">' +
                    '<span>来源：'+me.newsDetail.article.source+'</span>' +
                    '<span>'+me.newsDetail.article.create_time+'</span>' +
                    '<span>文章作者：'+me.newsDetail.article.author+'</span>' +
                    '</div>' +
                    '<div class="message_sub">' +
                    me.newsDetail.article.subtitle +
                    '</div>' +
                    '<div class="message_content">' +
                    'me.newsDetail.article.content' +
                    '</div>';
                var toNews = "";
                toNews += me.newsDetail.previous.id?'<a class="i'+me.newsDetail.previous.id+'" href="javascript:"><span>上一篇：</span>'+me.newsDetail.previous.title+'</a>':"";
                toNews += me.newsDetail.next.id?'<a class="i'+me.newsDetail.next.id+'" href="javascript:"><span>下一篇：</span>'+me.newsDetail.next.title+'</a>':"";
                me.toNewNews[0].innerHTML = toNews;
            }).catch(function(err){
                console.log(err);
            });
        },
        fun:function(){
            return {
                repeatPopular:function(arr,className,activeClass,appendParent,num){
                    var fregment = document.createDocumentFragment();
                    for(var i=0;i<arr.length;i++){
                        var div = document.createElement("div");
                        var date = arr[i].create_time.split(" ")[0];
                        var active = i<3?activeClass:'';
                        var index = num?"":Number(i)+1;
                        div.className = className+" i"+arr[i].id;

                        div.innerHTML =
                            '<span class="weibo_content '+active+'"><span>'+index+'</span>'+arr[i].title+'</span>'+
                            '<span class="weibo_date">'+date+'</span>';
                        fregment.appendChild(div);
                    }
                    appendParent[0].appendChild(fregment);
                }
            }
        }
    };
    $(document).ready(function(){
        project.init();
    });
})($);