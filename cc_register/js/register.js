/**
 * Created by YK on 2017/8/1.
 */
$(document).ready(function(){
    var realCode;
    function loading(msg){
        $(".modal-content").html(msg);
        $(".modal").css("display","block");
        setTimeout(function(){
            $(".modal").css("display","none");
        },1500);
    }
    /*发送验证密码*/
    $("#send-msg").click(function(){
        if(!$("#phone").val() || $("#phone").val().length != 11){
            loading("请输入手机号");
        }else{
            $.ajax({
                url: "http://jihua.yike1908.com/app/index.php?i=1&c=entry&m=yike_ts_plan&do=sendmsg&op=register&phone="+$("#phone").val(),
                dataType: 'jsonp',
                processData: false,
                type: 'get',
                success: function (data) {
                    console.log(data);
                    if(data.status == 1){
                        loading("成功获取验证码");
                        realCode = data.result.msg.code;
                    }else{
                        loading(data.result.result);
                    }
                },
                error: function (err) {
                    loading(err);
                }
            });
        }
    });
    /*注册*/
    $("#register").click(function(){
        console.log(realCode);
        console.log($("#code").val());
        console.log($("#pwd1").val());
        console.log($("#pwd2").val());
        if(!$("#phone").val() || $("#phone").val().length != 11){
            loading("请输入手机号");
        }else if(!$("#code").val()){
            loading("请输验证码");
        }else if(!$("#pwd1").val() && !$("#pwd2").val()){
            loading("请输入密码");
        }else if($("#code").val() != realCode){
            loading("验证码有误");
        }else if($("#pwd1").val() != $("#pwd2").val()){
            loading("请输入的密码相同")
        }else{
            $.ajax({
                url: "http://jihua.yike1908.com/app/index.php?i=1&c=entry&m=yike_ts_plan&do=register&phone="+$("#phone").val()+"&mac=&qq=&nickname=&password="+$("#pwd1").val()+"&tourists=0",
                dataType: 'jsonp',
                processData: false,
                type: 'get',
                success: function (data) {
                    loading(data.result.result);
                },
                error: function (err) {
                    loading(err);
                }
            });
        }
    });
});

