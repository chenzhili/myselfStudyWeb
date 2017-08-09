/**
 * Created by YK on 2017/8/1.
 */
$(document).ready(function(){
    var countdown=60;
    function settime(obj) { 
        if (countdown == 0) {
            obj.removeAttribute("disabled");
            obj.innerHTML="获取验证码";
            countdown = 60;
            return; 
        } else {
            obj.setAttribute("disabled", true); 
            obj.innerHTML="重新发送(" + countdown + ")"; 
            countdown--;
        }
        setTimeout(function() {
                settime(obj) }
            ,1000)
    }
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
                    if(data.status == 1){
                        loading("成功获取验证码");
                        console.log(data);
                        realCode = data.result.msg.code;
                        var sendMsg=document.body.querySelector('#send-msg');
                        settime(sendMsg);
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
        if(!$("#phone").val() || $("#phone").val().length != 11){
            loading("请输入手机号");
        }else if(!$("#code").val()){
            loading("请输验证码");
        }else if(!$("#qq").val()){
            loading("请输入QQ");
        }else if(!$("#pwd1").val() && !$("#pwd2").val()){
            loading("请输入密码");
        }else if($("#code").val() != realCode){
            loading("验证码有误");
        }else if($("#pwd1").val() != $("#pwd2").val()){
            loading("请输入的密码相同")
        }else{
            $.ajax({
                url: "http://jihua.yike1908.com/app/index.php?i=1&c=entry&m=yike_ts_plan&do=register&phone="+$("#phone").val()+"&mac=&qq="+$("#qq").val()+"&nickname=&password="+$("#pwd1").val()+"&tourists=0&links_id="+$("#links_id").val(),
                dataType: 'jsonp',
                processData: false,
                type: 'get',
                success: function (data) {
                    loading(data.result.result);
                    if(data.status == 1){
                        $("#download").css("display","block");
                    }
                    $("#phone").val("");
                    $("#code").val("");
                    $("#pwd1").val("");
                    $("#pwd2").val("");
                    $("#qq").val("");
                },
                error: function (err) {
                    loading(err);
                }
            });
        }
    });
});

