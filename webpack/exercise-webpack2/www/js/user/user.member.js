(function () {
    'use strict';

    angular
        .module('user.member', [])
        .controller('MemberCenterCtrl', MemberCenterCtrl);

    MemberCenterCtrl.$inject = ['$scope','$yikeUtils','$state','localStorageService','$ionicModal','$ionicTabsDelegate','$ionicLoading','$ionicActionSheet'];
    /* @ngInject */
    function MemberCenterCtrl($scope,$yikeUtils,$state,localStorageService ,$ionicModal,$ionicTabsDelegate,$ionicLoading,$ionicActionSheet){
        init();
        function init() {
           if(localStorage.getItem('xgmhvip')){
            $scope.isvip='isvip';
           }
        }

        $scope.superVIP=superVIP;
        function superVIP(){
           var hideSheet = $ionicActionSheet.show({
            buttons: [
              { text: '立即支付' }
            ],
            titleText: '是否确认开通',
            cancelText:'取消',
            cancel: function() {
                
            },
            buttonClicked: function(index) {
                hideSheet();
                inAppPurchase.getProducts(["user_vipx"])
                .then(function (products) {
                    $scope.products = products;
                    inAppPurchase
                      .buy($scope.products[0].productId)
                      .then(function (data) {
                               return inAppPurchase.consume(data.type, data.receipt, data.signature);
                            })
                      .then(function () {
                              $yikeUtils.toast('支付成功!');
                              localStorage.setItem('xgmhvip','xgmhvip');
                            })
                      .catch(function (err) {
                              $yikeUtils.toast('支付异常');
                            });
                })
                .catch(function (err) {
                   $yikeUtils.toast('支付失败，错误是'+err);
                })
            }
        });
        } 
    }
})();