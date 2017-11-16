/**
 * Created by john on 2016/8/30.
 */
(function () {
    'use strict';

    angular
        .module('slide.show', [])
        .controller('SlideShowCtrl', SlideShowCtrl);

    SlideShowCtrl.$inject = ['$scope','$yikeUtils','$state','$ionicHistory','$ionicModal','$ionicTabsDelegate'];
    /* @ngInject */
    function SlideShowCtrl($scope,$yikeUtils,$state,$ionicHistory,$ionicModal,$ionicTabsDelegate){
        init();
        function init(){
           if(localStorage.getItem('jcbanner')){
               $state.go('tab.home');
           }else{
               localStorage.setItem('jcbanner','jcbanner');
           }
        }

        $scope.stetaGo=function(){
            $state.go('tab.home');
        }
    }
})();
