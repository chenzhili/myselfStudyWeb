/**
 * Created by frank on 2016/9/8.
 */
(function () {
  'use strict';

  angular
    .module('information.controller', [])
    .controller('InformationCtrl', InformationCtrl);

  InformationCtrl.$inject = ['$scope','$yikeUtils','$state','$ionicHistory','$ionicModal','localStorageService','$ionicLoading','$ionicTabsDelegate'];
  /* @ngInject */
  function InformationCtrl($scope,$yikeUtils,$state,$ionicHistory,$ionicModal,localStorageService,$ionicLoading,$ionicTabsDelegate){
    init();
    function init(){
      $ionicTabsDelegate.showBar(true);//隐藏开奖走势导航栏
      yikeTaishan.information()
        .then(function(data){
          $scope.infoList = data.result.consulting;
          $scope.$digest();
        })
        .catch(function(err){
          $yikeUtils.toast(err);
        })
    }
  }
})();
