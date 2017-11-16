(function () {
  'use strict';
  angular
    .module('user.online.service',[])
    .controller('OnlineCtrl',OnlineCtrl);
  OnlineCtrl.$inject = ['$scope','$yikeUtils','$ionicModal','$cordovaDevice','$sce'];
  function OnlineCtrl($scope,$yikeUtils,$ionicModal,$cordovaDevice,$sce){
    $scope.trustSrc = $sce.trustAs($sce.RESOURCE_URL,"https://v88.live800.com/live800/chatClient/chatbox.jsp?companyID=597963&configID=6672&jid=5766931572&s=1");
  }
})();
