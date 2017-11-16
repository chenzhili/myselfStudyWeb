/**
 * Created by frank on 2016/9/8.
 */
(function () {
  'use strict';

  angular
    .module('user.information.controller', [])
    .controller('UserInformationCtrl', UserInformationCtrl);

  UserInformationCtrl.$inject = ['$scope','$yikeUtils','$state','$ionicHistory','$ionicModal','localStorageService','$ionicLoading'];
  /* @ngInject */
  function UserInformationCtrl($scope,$yikeUtils,$state,$ionicHistory,$ionicModal,localStorageService,$ionicLoading){
    init();
    function init(){
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
