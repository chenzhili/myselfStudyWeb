/**
 * Created by YK on 2017/12/7.
 */
var ajax = (function($){
    return function(urlType,data,type){
        //规定 data 为对象;
        var tempA = data?"?":"";
        var url = "http://www.0234abc.com/index.php/yike_dashuju/"+urlType+""+tempA;
        if(data){
            for(var key in data){
                url += ""+key+"="+data[key]+"&"
            }
        }
        return new Promise(function(resolve,reject){
            $.ajax({
                url: url,
                dataType: 'json',
                processData: false,
                type: type || 'get',
                success: function (data) {
                    resolve(data.data);
                },
                error: function (data) {
                    reject(data);
                }
            });
        });
    }
})($);