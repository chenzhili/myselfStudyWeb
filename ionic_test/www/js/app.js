// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform,$rootScope) {
  var left,top,totalHeight = window.screen.availHeight,totalWidth = window.screen.availWidth;

  /*拖拽事件的运用*/
    //拖拽事件的发生
  $rootScope.icoD = function(e){
    var el = e.target;
    left +=e.gesture.deltaX;
    top +=e.gesture.deltaY;
    el.style.left = left+"px";
    el.style.top = top+"px";
  }
    //用户按下触发的
  $rootScope.touchDown = function(e){
    var el = e.target;
    left = Number(getComputedStyle(el).left.split("p")[0]);
    top = Number(getComputedStyle(el).top.split("p")[0]);
    console.log(left);
    console.log(top);
  }
   //用户松开事件
   $rootScope.releaseUp = function(e){
    var el = e.target;
    var elWidth = Number(getComputedStyle(el).width.split("p")[0]);
    console.log(elWidth);
    var elHeight = Number(getComputedStyle(el).height.split("p")[0]);
    if(top <= 0){
      el.style.top = 0;
    }else if(top >= totalHeight){
      el.style.top = totalHeight;
    }
    /*if(left <= (totalWidth/2-elWidth/2)){
      el.style.left = 4px;
    }else{
      el.style.right = 4px;
    }*/
   }
  /*$rootScope.releaseUp = function(e){
    var el = e.target;
    var elWidth = Number(getComputedStyle(el).width.split("p")[0]);
    console.log(elWidth);
    var elHeight = Number(getComputedStyle(el).height.split("p")[0]);
    if(top <= 0){
      el.style.top = 0;
    }else if(top >= totalHeight){
      el.style.top = totalHeight;
    }
    if(left <= totalWidth/2-elWidth/2){
      el.style.left = 4px;
    }else{
      el.style.right = 4px;
    }
  }*/

  $rootScope.disState=0;
  $rootScope.fade = 0;
  $rootScope.$on("$ionicView.beforeEnter",function(){
    if($rootScope.disState == 1){
      $rootScope.fade = 1;
    }
    if($rootScope.disState == 0){
      $("#indexBar").removeClass("no-display");
    }
  });
  $rootScope.$on("$ionicView.beforeLeave",function(){
    $rootScope.disState = 0;
  });
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('chats', {
      url: '/chats',
        templateUrl: 'templates/tab-chats.html',
        controller: 'ChatsCtrl'
    })
    .state('openUser', {
      url: '/openUser',
      templateUrl: 'templates/open-user.html',
      controller: 'openUserCtrl'
    })
    .state('applyB1', {
      url: '/applyB1',
      templateUrl: 'templates/applyB1.html',
      controller: 'applyB1Ctrl'
    })
    .state('gasQuery', {
      url: '/gasQuery',
      templateUrl: 'templates/gasQuery.html',
      controller: 'gasQueryCtrl'
    })

    .state('account',{
      url:"/account",
      templateUrl:"templates/tab-account.html",
      controller: 'AccountCtrl'
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })
    .state('swip',{
      url:'/swip',
      templateUrl:'templates/swip.html',
      controller:'swipCtrl'
    })
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/account2.html',
        controller:'account2Ctrl'
      }
    }
  })
  .state("time",{
    url:"/time",
    templateUrl:"templates/time.html",
    controller:"timeCtrl"
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/time');

})
