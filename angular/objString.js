/**
 * Created by YK on 2017/2/25.
 */
(function () {
    angular.module("interString",[])
        .value("ln_ch",{
            "游戏大厅":{
                name:"快三游戏",
                play:"投注",
                userName:"{{userName}}"
            }
        });
})();
