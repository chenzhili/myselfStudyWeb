// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'yike', 'templates','tab.module', 'user.module', 'LocalStorageModule', 'ngCordova', 'platform.module', 'ionic-native-transitions'])

    .run(function ($ionicPlatform, $rootScope, $location, $yikeUtils, $state, $ionicHistory, $cordovaToast, $ionicPopup, $ionicLoading, $timeout, localStorageService, $http) {
        //连接超时
        window.connectionTimeout = function () {
            $yikeUtils.toast('请求超时');
        };

        document.addEventListener("offline", onOffline, false);
        function onOffline() {
            $yikeUtils.toast('未连接网络');
        }
        /*联系QQ客服的全局方法*/
        $rootScope.openQQ = function(){
          yikeTaishan.personalCenter('platform','')
            .then(function(data){
              if(data.status == 1){
                var qq = data.result.qq;
                cordova.InAppBrowser.open('mqqwpa://im/chat?chat_type=wpa&uin='+qq+'&version=1&src_type=web&web_src=oicqzone.com','_system','location=no,toolbar=yes,toolbarposition=top,closebuttoncaption=关闭')
              }
            })
            .catch(function(err){
              $yikeUtils.toast(err);
            })
        };
        //双击退出
        $ionicPlatform.registerBackButtonAction(function (e) {
            //判断处于哪个页面时双击退出
            var path = $location.path();
            if (path == '/tab/home' || path == '/tab/account' || path == '/tab/lottery' || path == '/login') {
                if ($rootScope.backButtonPressedOnceToExit) {
                    ionic.Platform.exitApp();
                } else {
                    $rootScope.backButtonPressedOnceToExit = true;
                    $cordovaToast.show('再按一次退出系统', 1000, 'bottom');
                    setTimeout(function () {
                        $rootScope.backButtonPressedOnceToExit = false;
                    }, 2000);
                }
            } else if ($ionicHistory.backView()) {
                $ionicHistory.goBack();
            } else {
                $rootScope.backButtonPressedOnceToExit = true;
                $cordovaToast.show('再按一次退出系统', 1000, 'bottom');
                setTimeout(function () {
                    $rootScope.backButtonPressedOnceToExit = false;
                }, 2000);
            }
            e.preventDefault();
            return false;
        }, 101);

        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
                //延迟splash screnn 隐藏时间,不然会有短暂的白屏出现
                setTimeout(function () {
                    navigator.splashscreen.hide();
                }, 3000);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

            try {
                JAnalytics.init();
                JAnalytics.setDebugMode();
            } catch (ex) {
                console.log(ex);
            }

            //启动极光推送服务
            try {
                if (window.plugins.jPushPlugin) {
                    window.plugins.jPushPlugin.init();
                    window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
                    window.plugins.jPushPlugin.setBadge(0);
                    document.addEventListener("jpush.openNotification", function (event) {
                        var alertContent, url, params, id, target = {};
                        if (device.platform == "Android") {
                            alertContent = window.plugins.jPushPlugin.openNotification.alert;
                            var extras = window.plugins.jPushPlugin.openNotification.extras['cn.jpush.android.EXTRA'];
                            url = extras.url;
                            params = extras.params;
                            id = extras.id;
                        } else {
                            url = event.url;
                            params = event.params;
                            id = event.id;
                            window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
                            window.plugins.jPushPlugin.setBadge(0);
                        }
                        target[params] = id;
                        $state.go(url, target);
                    }, false);
                    document.addEventListener("jpush.receiveNotification", function (event) {
                        window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
                        window.plugins.jPushPlugin.setBadge(0);
                    });
                }
            } catch (ex) {
                console.log(ex);
            }

        });

    })
    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $ionicNativeTransitionsProvider) {
        $ionicNativeTransitionsProvider.setDefaultOptions({
            duration: 300, // in milliseconds (ms), default 400,
            slowdownfactor: 4, // overlap views (higher number is more) or no overlap (1), default 4
            iosdelay: -1, // ms to wait for the iOS webview to update before animation kicks in, default -1
            androiddelay: -1, // same as above but for Android, default -1
            winphonedelay: -1, // same as above but for Windows Phone, default -1,
            fixedPixelsTop: 0, // the number of pixels of your fixed header, default 0 (iOS and Android)
            fixedPixelsBottom: 0, // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
            triggerTransitionEvent: '$ionicView.afterEnter', // internal ionic-native-transitions option
            backInOppositeDirection: false // Takes over default back transition and state back transition to use the opposite direction transition to go back
        });
        $ionicNativeTransitionsProvider.setDefaultTransition({
            type: 'slide',
            direction: 'left'
        });
        $ionicNativeTransitionsProvider.setDefaultBackTransition({
            type: 'slide',
            direction: 'right'
        });
        $ionicConfigProvider.tabs.position('bottom');
        $ionicConfigProvider.tabs.style('standard');
        $ionicConfigProvider.navBar.alignTitle('center');
        $ionicConfigProvider.backButton.icon('ion-ios-arrow-left');
        $ionicConfigProvider.views.maxCache(0);
        $ionicConfigProvider.views.swipeBackEnabled(false);
        // $ionicC
        $ionicConfigProvider.views.transition('none');
        $ionicConfigProvider.scrolling.jsScrolling(true);
        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'tabs.html'
            })
            //首页
            .state('tab.home', {
                url: '/home',
                nativeTransitions: null,
                views: {
                    'tab-home': {
                        templateUrl: 'tab-home.html',
                        controller: 'HomeCtrl'
                    }
                }
            })
            //资讯
            .state('tab.info', {
              url: '/info',
              nativeTransitions: null,
              views: {
                'tab-info': {
                  templateUrl: 'tab-info.html',
                  controller: 'InformationCtrl'
                }
              }
            })
            //历史开奖
            .state('tab.lottery', {
                url: '/lottery',
                nativeTransitions: null,
                views: {
                    'tab-lottery': {
                        templateUrl: 'tab-lottery.html',
                        controller: 'LotteryCtrl'
                    }
                }
            })
            //开奖走势
            .state('tab.movements', {
                url: '/movements',
                nativeTransitions: null,
                views: {
                    'tab-movements': {
                        templateUrl: 'tab-movements.html',
                        controller: 'MovementsCtrl'
                    }
                }
            })
            //个人中心
            .state('tab.account', {
                url: '/account',
                nativeTransitions: null,
                views: {
                    'tab-account': {
                        templateUrl: 'tab-account.html',
                        controller: 'AccountCtrl'
                    }
                }
            })
            //推荐方案
            .state('recommend-program', {
                url: '/recommend-program/:playType',
                templateUrl: 'recommend-program.html',
                controller: 'PlatformSchemeCtrl'
            })
            //方案详情
            .state('program-details', {
                url: '/program-details/:id/:type',
                templateUrl: 'program-details.html',
                controller: 'PlatformProgramDetailsCtrl'
            })
            //我的方案
            .state('my-scheme', {
                url: '/my-scheme',
                templateUrl: 'my-scheme.html',
                controller: 'UserSchemeCtrl'
            })
            //注册
            .state('register', {
                url: '/register',
                templateUrl: 'user-register.html',
                controller: 'UserRegisterCtrl'
            })
            //充值
            .state('recharge', {
                url: '/recharge',
                templateUrl: 'user-recharge.html',
                controller: 'UserRechargeCtrl'
            })
            //验证邮箱
            .state('verification-email', {
                url: '/verification-email/:uid',
                templateUrl: 'verification-email.html',
                controller: 'UserVerificationEmailCtrl'
            })
            //重置密码
            .state('reset-password', {
                url: '/reset-password',
                templateUrl: 'reset-password.html',
                controller: 'UserResetPasswordCtrl'
            })
            //修改密码
            .state('modification-password', {
                url: '/modification-password',
                templateUrl: 'modification-password.html',
                controller: 'UserModificationPasswordCtrl'
            })
            //登录
            .state('login', {
                url: '/login',
                templateUrl: 'user-login.html',
                controller: 'UserLoginCtrl'
            })
            //绑定手机
            .state('bind-phone', {
                url: '/bind-phone',
                templateUrl: 'bind-phone.html',
                controller: 'UserBindPhoneCtrl'
            })
            //已绑定手机
            .state('linked-phone', {
                url: '/linked-phone',
                templateUrl: 'linked-phone.html',
                controller: 'UserLinkedPhoneCtrl'
            })
            //资讯
            .state('information', {
              url: '/information',
              templateUrl: 'information.html',
              controller: 'UserInformationCtrl'
            })
            //资讯详情
            .state('information-details', {
              url: '/information-details/:id',
              templateUrl: 'information-details.html',
              controller: 'UserInformationDetailsCtrl'
            })
            //我的消息
            .state('my-message', {
                url: '/my-message',
                templateUrl: 'my-message.html',
                controller: 'UserMessageCtrl'
            })
            //我的消息详情
            .state('my-message-detail', {
                url: '/my-message-detail/:id',
                templateUrl: 'my-message-detail.html',
                controller: 'UserMessageDetailCtrl'
            })
            //第3方客服
            .state('online-service', {
                url: '/online-service',
                templateUrl: 'online-server.html',
                controller: 'OnlineCtrl'
            })
            .state('slide-show',{
                url: '/slide-show',
                templateUrl: 'slide-show.html',
                controller:'SlideShowCtrl'
            })
            .state('member-center',{
                url:'/member-center',
                templateUrl: 'member-center.html',
                controller:'MemberCenterCtrl'
            })
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/home');

    });
