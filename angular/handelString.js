/**
 * Created by YK on 2017/2/25.
 */
(function () {
    angular.module("handleString",["interString"])
        .factory("HandleString",["$interpolate","ln_ch",function($interpolate,ln_ch){
            var Obj = function(){};
            Obj.prototype.ch_string = function(){
                return ln_ch;
            };
            Obj.prototype.return_ch = function(name,userName){
                var interpolateFun = $interpolate(this.ch_string()[name]);
                var newString = interpolateFun({userName:userName});
                return newString;
            };
                return Obj;
        }]);
})();
