/**
 * Created by YK on 2017/6/14.
 */
$("#nav").click(function(e){
    if(e.target.nodeName == "A"){
        $("#nav a").removeClass("active");
        $(e.target).addClass("active");
    }
});
$("#type").click(function(e){
    var target = e.target;
    if(target.nodeName == "DIV"){
        $("#type div").removeClass("type_active");
        $(target).addClass("type_active");
        if(target.id == "pk"){
            $("#downloadSplash").attr("src","img_pc/download_pk_splash.png");
            $("#titleImg").attr("src","img_pc/download_pk_title.png");
            $("#linkIOS").attr("href","http://fir.im/ydth");
            $("#linkAn").attr("href","http://www.jiucaijihua.com/jiucai/jiucai_pk.apk");
            makeQr("qrCode","http://114.215.222.89/app/index.php?i=4&c=entry&m=yike_ts_plan&do=download&sizs=6&callback=jQuery21402001338752895021_1497524994083&_=1497524994084&type=pk");
        }else if(target.id == "ssc"){
            $("#downloadSplash").attr("src","img_pc/download_ssc_splash.png");
            $("#titleImg").attr("src","img_pc/download_ssc_title.png");
            $("#linkIOS").attr("href","http://fir.im/hvcn");
            $("#linkAn").attr("href","http://www.jiucaijihua.com/jiucai/jiucai_ssc.apk");
            makeQr("qrCode","http://114.215.222.89/app/index.php?i=4&c=entry&m=yike_ts_plan&do=download&sizs=6&callback=jQuery21402001338752895021_1497524994083&_=1497524994084&type=ssc");
        }
    }
});
/*pc版*/
function makeQr(ele,http,state){
    $("#"+ele)[0].innerHTML = "";
    new QRCode($("#"+ele)[0],{
        width:"140",
        height:"140"
    }).makeCode(http);
    if(state){
        $("#"+ele+" img").css("width","100%");
    }
}
makeQr("qrCode","http://114.215.222.89/app/index.php?i=4&c=entry&m=yike_ts_plan&do=download&sizs=6&callback=jQuery21402001338752895021_1497524994083&_=1497524994084&type=pk");
/*判断屏幕尺寸的方法*/
function judgeScreen(bigClass,smallClass){
    var big = document.getElementsByClassName(bigClass)[0];
    var small = document.getElementsByClassName(smallClass)[0];
    if(window.screen && screen.width){
        if(screen.width > "1024"){
            big.style.display = "block";
            small.style.display = "none";
        }else{
            big.style.display = "none";
            small.style.display = "block";
        }
    }
}
window.onload = function(){
    judgeScreen("big_screen","small_screen");
};

/*小屏幕的js*/
var mySwiper;
$(document).ready(function(){
    mySwiper = new Swiper ('.swiper-container', {
        direction:"horizontal",
        observer:true,
        observeParents:true,
        loop: true,
        onSlideChangeEnd:function(swiper){
            if(swiper.activeIndex == 2 || swiper.activeIndex == 0){
                $(".switch_content").removeClass("switch_active");
                $($(".switch_content")[0]).addClass("switch_active");
            }else if(swiper.activeIndex == 3 || swiper.activeIndex == 1){
                $(".switch_content").removeClass("switch_active");
                $($(".switch_content")[1]).addClass("switch_active");
            }
        }
    });
    /*模态对应的不同二维的方法*/
    $(".small_pk_code").click(function(){
        console.log(1);
        $(".mark").css("display","block");
        $("#style_title").attr("src","img_mobile/mark_code_pk.png");
        makeQr("mark_code","http://114.215.222.89/app/index.php?i=4&c=entry&m=yike_ts_plan&do=download&sizs=6&callback=jQuery21402001338752895021_1497524994083&_=1497524994084&type=pk","100");
    });
    $(".small_ssc_code").click(function(){
        $(".mark").css("display","block");
        $("#style_title").attr("src","img_mobile/mark_code_ssc.png");
        makeQr("mark_code","http://114.215.222.89/app/index.php?i=4&c=entry&m=yike_ts_plan&do=download&sizs=6&callback=jQuery21402001338752895021_1497524994083&_=1497524994084&type=ssc","100");
    });
    $(".mark").click(function(){
        $(this).css("display","none");
    });
});
$("#small_switch").click(function(e){
    if(e.target.innerText == "重庆时时彩"){
        $(".switch_content").removeClass("switch_active");
        $($(".switch_content")[0]).addClass("switch_active");
        mySwiper.slideTo(2);
    }else{
        $(".switch_content").removeClass("switch_active");
        $($(".switch_content")[1]).addClass("switch_active");
        mySwiper.slideTo(3);
    }
});

/*考出来的js*/
    /*html*/
    /*<!--投注确认区域-->*/
                    <div class="bet-info">
                        <div class="fl manual-bet">
                            投注金额：<input value="10" class="bet-money" type="text" onkeyup="(function(){
                            this.value=this.value.replace(/[^0-9-]+/,'');
                            if(this.value.replace(/0+/,'0') == '0' && event.key == '0'){
                            this.value = (this.value).replace(/^([\s,0]+)/gi,'');
                        }
                        this.value = (this.value).replace(/^([\s,0]+)/gi,'');}.bind(this))(event)"/> 元
                        </div>
                        <ul class="fl sprite-yuan">
                            <li class="cm">
                                <span>10</span>
                                <input type="text" value="10">
                            </li>
                            <li class="cm">
                                <span>100</span>
                                <input type="text" value="100">
                            </li>
                            <li class="cm">
                                <span>500</span>
                                <input type="text" value="500">
                            </li>
                            <li class="cm">
                                <span>1000</span>
                                <input type="text" value="1000">
                            </li>
                            <li class="cm">
                                <span>5000</span>
                                <input type="text" value="5000">
                            </li>
                        </ul>
                        <div id="submit_defined" class="fl bet-btn">
                            <div class="submit-btn fl">确定投注</div>
                            <div class="zdy-btn fl">自定义</div>
                        </div>
                        <div id="bet_defined" class="fl bet-btn" style="display:none;">
                            <div class="defined-btn fl">保存自定义</div>
                            <div class="cancel-btn fl">取消</div>
                        </div>
                    </div>


/*js*/
(function () {
    'use strict';

    angular
    .module('luck.controller', [])
    .controller('LuckCtrl', LuckCtrl);
    /* @ngInject*/
    LuckCtrl.$inject = ['$scope'];

    function LuckCtrl($scope) {
        var number, playdId,ind;
        var game = {
            type: 50
        };
        $scope.game = {
            time: [0, 0, 0, 0, 0, 0],
            result: [],
            actionNo: 8889,
            historyList: []
        };
        $scope.isLoading = true;

        var T;
        var kjTimer;

        // loadKjData();
        getQiHao();
        getHistoryData();
        getOdds();
        getOrders();

        function getOdds() {
            Q('Luck', 'odds', {}, function (data) {
                $scope.game.odds = data.info.groups;
                $scope.$digest();
            });
        }

        function getOrders() {
            Q('Game', 'getOrders', {type: 50, limit: 20}, function (data) {
                $scope.game.orders = data.info.order_list;
                $scope.game.playeds = data.info.playeds;
                $(".lucky-box").show();
                $scope.$digest();
            });
        }

        $('.number').click(function () {
            $('.number').removeClass('active');
            $('.num').removeClass('active');
            var index = $('.number').index(this);
            playdId = 250 + parseInt(index);
            if ($(this).hasClass('nums')) {
                $(this).find('.num').addClass('active');
            } else {
                $(this).addClass('active');
            }
            ind = parseInt(index);
            if (index < 28) {
                number = index;
            } else if (index == 28) {
                number = '大';
                playdId = 280;
            } else if (index == 29) {
                number = '小';
                playdId = 281;
            } else if (index == 30) {
                number = '单';
                playdId = 282;
            } else if (index == 31) {
                number = '双';
                playdId = 283;
            } else if (index == 32) {
                number = '大单';
                playdId = 284;
            } else if (index == 33) {
                number = '大双';
                playdId = 286;
            } else if (index == 34) {
                number = '小单';
                playdId = 285;
            } else if (index == 35) {
                number = '小双';
                playdId = 287;
            } else if (index == 36) {
                number = '极大';
                playdId = 288;
            } else if (index == 37) {
                number = '极小';
                playdId = 289;
            } else if (index == 38) {
                number = '豹子';
                playdId = 294;
            } else if (index == 39) {
                number = '红';
                playdId = 290;
            } else if (index == 40) {
                number = '绿';
                playdId = 291;
            } else if (index == 41) {
                number = '蓝';
                playdId = 292;
            } else if (index == 42) {
                number = '特码';
                playdId = 293;
            }
        });

        $('.cm span').click(function () {
            var money = parseInt($('.bet-money').val())||0;
            money += parseInt($(this).text());
            $('.bet-money').val(money);
        });

        /*对于自定义按钮点击事件的增加*/
        $('.zdy-btn').click(function(){
            $('#submit_defined').css('display','none');
            $('#bet_defined').css('display','block');
            $('.cm span').css('display','none');
            $('.cm input').css('display','inline-block');
        });
        /*确认自定义点击事件的发生*/
        $('.defined-btn').click(function(){
            var $span = $('.cm span');
            for(var i=0,l=$span.length;i<l;i++){
                $($span[i]).text($($span[i]).next().val()||0);
            }
            $('#submit_defined').css('display','block');
            $('#bet_defined').css('display','none');
            $('.cm span').css('display','inline-block');
            $('.cm input').css('display','none');
        });
        /*取消按钮点击事件的发生*/
        $('.cancel-btn').click(function(){
            $('#submit_defined').css('display','block');
            $('#bet_defined').css('display','none');
            $('.cm span').css('display','inline-block');
            $('.cm input').css('display','none');
        });


        $('.submit-btn').click(function () {
            if(playdId == 293){
                number = $('#one').val() + '|' + $('#two').val() + '|' + $('#three').val();
            }
            aler();

            function aler(){
                /*判断是否有钱*/
                $("#del").click(function(){
                    $("#ap,#qp").css('display','none');
                })
                if(!$('.bet-money').val()){
                    $("#ap,#qp").css('display','block');
                    $("#tex").text('请输入金额?');
                    $("#btn1").bind('click',function(){
                        $("#ap,#qp").css('display','none');
                    });
                    return;
                }
                if(!ind){
                    $("#ap,#qp").css('display','block');
                    $("#tex").text('请选择投注?');
                    $("#btn1").bind('click',function(){
                        $("#ap,#qp").css('display','none');
                    });
                    return;
                }
                $("#ap,#qp").css('display','block');
                $("#tex").text('是否投注?');
                $("#btn1").bind('click',function(){
                    $("#ap,#qp").css('display','none');
                    var payload = {};
                    var code = [{
                        fanDian: 0.0,
                        bonusProp: $scope.game.odds[ind].bonusProp,
                        mode: 2,
                        beiShu: $('.bet-money').val() / 2,
                        orderId: (new Date())-2147483647*623,
                        actionData: number,
                        actionNum: 1,
                        weiShu: 0,
                        playedId: playdId,
                        type: 50,
                        playedName: $scope.game.odds[ind].name,
                        flag: 1
                    }];
                    var para = {};
                    payload.code = code;
                    para.type = 50;
                    para.actionNo = $('.lottery-num:eq(0)').text();
                    payload.para = para;

                    Q('Game', 'postCode', payload, function (data) {
                        $("#ap,#qp").css('display','block');
                        $("#tex").text(data.info);
                        $("#btn1").unbind('click');
                        $("#btn1").bind('click',function(){
                            $("#ap,#qp").css('display','none');
                        });
                    // alert(data.info);
                    getOrders();
                });
                });
            }
        });
            

            $("#game-rule").click(function(){
                $('#rules').toggle();
                return false;
            });

            $("#kj_record").click(function(){
                $.ajax('/index.php?s=/home/luck/get_record', {
                    data:{},
                    type:'post',
                    dataType:'json',
                    error:function(xhr, textStatus, errorThrown){
                    },
                    success:function(data, textStatus, xhr){
                        $('#qi').nextAll().remove();
                        var arr = data.info;
                        for(var i=0;i<arr.length;i++){
                            $('#record').append('<p style="font-size: 12px;"><span style="margin-right: 60px">'+arr[i].number+'</span><span>'+arr[i].data+'</span></p>');
                        }
                        $('#record').toggle();
                    }
                });
                return false;
            });

        $('body').click(function(){
            $('#rules').hide();
            $('#record').hide();
            return false;
        });
        $('#rules').click(function(){
            return false;
        });

        /**
         * 更新余额
         */
         function reloadMemberInfo(){
            //子frame调用父窗口函数
            if(parent.window.autoupdate)
                parent.window.autoupdate('/index.php?s=/home/index/userinfo');
        }

        //更新会员及时信息
        function autoupdate(href) {
            $.ajax({
                type: "POST",
                url: href,
                dataType: "json",
                global: false,
                success: function (data) {
                    $("#j-refresh").removeClass("fa-spin").removeClass("fa-2x");
                    $("#user_sscmoney").html(data.coin);
                    $('.balance').text(data.coin);
                    $("#user_nickname").html(data.nickname);
                    if (data.enable == "0")
                    {
                        alert("您帐号被冻结，请联系在线客服");
                        //document.location.href = "/public/logout";
                        return;
                    }
                },
                error: null,
                cache: false
            });
        }


        function getHistoryData() {
            Q('Index', 'getHistoryData', {type: 50}, function (data) {
                var _data = data.info.history;
                var list = [];
                for (var i = 0; i < _data.length; i++) {
                    var obj = _data[i];
                    var result = obj.data.split(',');
                    result[0] = parseInt(result[0]);
                    result[1] = parseInt(result[1]);
                    result[2] = parseInt(result[2]);
                    var total = result[0] + result[1] + result[2];
                    var daxiao, danshuang;
                    if (total > 13) {
                        daxiao = '大';
                    } else {
                        daxiao = '小';
                    }
                    if (total % 2 == 0) {
                        danshuang = '双';
                    } else {
                        danshuang = '单';
                    }
                    obj.total = total;
                    obj.result = result;
                    obj.daxiao = daxiao;
                    obj.danshuang = danshuang;
                    list.push(obj);
                }
                $scope.game.historyList = list.slice(0, 4);
                $scope.$digest();
                if (kjTimer) clearTimeout(kjTimer);
                kjTimer = setTimeout(getHistoryData, 10000);
            })
        }

        function gameKanJiangDataC(diffTime, actionNo) {

            diffTime = window.diffTime--;
            if (diffTime < 0) {
                if (T) clearTimeout(T);
                getQiHao();
                kjTimer = setTimeout(loadKjData, 10000);

            } else {

                var m = Math.floor(diffTime % 60),
                s = (diffTime-- - m) / 60,
                h = 0;

                if (s < 10) {
                    s = "0" + s;
                }

                if (m < 10) {
                    m = "0" + m;
                }

                if (s > 60) {
                    h = Math.floor(s / 60);
                    s = s - h * 60;
                    // $dom.html((h<10?"0"+h:h)+"&nbsp;"+(s<10?"0"+s:s)+"&nbsp;"+m);
                    var t = (h < 10 ? "0" + h : h) + (s < 10 ? "0" + s : s) + m;
                    $scope.game.time = t.split('');
                    $scope.$digest();
                } else {
                    h = 0;
                    // $dom.html("00"+"&nbsp;"+s+"&nbsp;"+m);
                    var t = "00" + s + m;
                    $scope.game.time = t.split('');
                    $scope.$digest();
                }

                if (T) clearTimeout(T);
                T = setTimeout(function () {
                    gameKanJiangDataC();
                }, 1000);
            }
        }

        function loadKjData() {
            var type = game.type;
            $.ajax('/index.php?s=/home/index/getLastKjData/type/' + type, {
                dataType: 'json',
                cache: false,
                error: function () {
                    if (kjTimer) clearTimeout(kjTimer);
                    kjTimer = setTimeout(loadKjData, 10000);
                },
                success: function (data, textStatus, xhr) {
                    data = data.info;
                    if (!data) {
                        if (kjTimer) clearTimeout(kjTimer);
                        kjTimer = setTimeout(loadKjData, 10000);
                        $scope.game.result = [];
                    } else {
                        try {
                            $scope.game.result = data.data.split(',');
                            $scope.game.total = parseInt($scope.game.result[0])
                            + parseInt($scope.game.result[1])
                            + parseInt($scope.game.result[2]);
                            if ($scope.game.total > 13) {
                                $scope.game.daxiao = '大'
                            } else {
                                $scope.game.daxiao = '小'
                            }

                            if ($scope.game.total % 2 == 0) {
                                $scope.game.danshuang = '双'
                            } else {
                                $scope.game.danshuang = '单'
                            }
                            $scope.$digest();
                        } catch (err) {
                            if (kjTimer) clearTimeout(kjTimer);
                            kjTimer = setTimeout(loadKjData, 10000);
                        }
                    }
                }
            });
        }

        function getQiHao() {
            $.getJSON('/index.php?s=/home/index/getQiHao/type/' + game.type, function (data) {
                if (data && data.lastNo && data.thisNo) {
                    $scope.game.actionNo = data.thisNo.actionNo;

                    if (T) clearTimeout(T);
                    var kjTime = parseInt(data.kjdTime);
                    window.diffTime = data.diffTime - kjTime;
                    T = setTimeout(function () {
                        gameKanJiangDataC();
                    }, 1000);
                }
            });
        }
    }
})();



