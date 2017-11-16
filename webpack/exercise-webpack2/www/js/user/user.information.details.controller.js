/**
 * Created by frank on 2016/9/8.
 */
(function () {
  'use strict';

  angular
    .module('user.information.details.controller', [])
    .controller('UserInformationDetailsCtrl', UserInformationDetailsCtrl);

  UserInformationDetailsCtrl.$inject = ['$scope','$yikeUtils','$state','$ionicHistory','$ionicModal','localStorageService','$ionicLoading','$sce'];
  /* @ngInject */
  function UserInformationDetailsCtrl($scope,$yikeUtils,$state,$ionicHistory,$ionicModal,localStorageService,$ionicLoading,$sce){
    $scope.id = $state.params.id;
    init();
    function init(){
      yikeTaishan.informationDetails($scope.id)
        .then(function(data){
          var pattern1=/&lt;/gim;
          var pattern2=/&gt;/gim;
          var pattern3=/&quot;/gim;
          data.result.consulting.content=data.result.consulting.content.replace(pattern1,'<');
          data.result.consulting.content=data.result.consulting.content.replace(pattern2,'>');
          data.result.consulting.content=data.result.consulting.content.replace(pattern3,'"');
          data.result.consulting.content =$sce.trustAsHtml(data.result.consulting.content);
          if(data.result.consulting.create_time){
            data.result.consulting.create_time = moment.unix(Number(data.result.consulting.create_time)).format("YYYY.MM.DD HH:mm");
          }
          $scope.infoDetails = data.result.consulting;
          $scope.$digest();
        })
        .catch(function(err){
          $yikeUtils.toast(err);
        })
    }
  }
})();
