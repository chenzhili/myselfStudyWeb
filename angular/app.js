/**
 * Created by YK on 2017/2/25.
 */
(function () {
    angular.module("myApp",["interString","handleString"])
        .controller("interString",interString);
    interString.$inject = ["$scope","ln_ch","HandleString"];
    function interString($scope,ln_ch,HandleString){
        /*假设用户的姓名*/
        $scope.name = "o噢噢噢噢";
        console.log(ln_ch);
        $scope.name=ln_ch["游戏大厅"].name;
        var obj = new HandleString();
        console.log(obj.return_ch("游戏大厅",name));
    }
})();
