import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, NavParams } from 'ionic-angular';
import { LiveDetailPage } from './live-detail/live-detail';
import { RepeatProvider } from '../../providers/repeat/repeat';
import * as $ from "jquery";
declare var $:any;
var $scope;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  host:{
    "(window:scroll)":"onWindowScroll($event)"
  }
})
export class HomePage {
  @ViewChild(Slides) slides:Slides;
  //@ViewChild(Content) content: Content;
  idmuen:string;
  activeId:string;
  day_active:string;
  today:string;
  adStatus:string;
  snu:any;
  deg:string;
  //scrollToTop() {
  //  this.content.scrollToTop();
  //}
  constructor(private goP:RepeatProvider, public navCtrl:NavController, public navParams: NavParams, ) {

    $scope = this;
    $scope.info = "";
    $scope.snu = '';
    $scope.adStatus = 0;
    $scope.deg = 0;
    this.getMonSun();
    this.getMenu();
    this.getSecMenu();
    //this.timeStamp= new Date(new Date().setHours(0, 0, 0, 0)) / 1000;
    //console.log(this.timeStamp);
    this.getStarEnd();
    //this.getGameList(snu);
    //-------------------------
    /*$(document).ready(function () {
      // Cache selectors for faster performance.
      var $window = $('#container'),
          $mainMenuBar = $('.title'),
          $mainMenuBarAnchor = $('#mainMenuBarAnchor');
      console.log($window);
      var arr = [];
      for (var i = 0; i < $mainMenuBar.length; i++) {
        arr.push($($mainMenuBar[i]).offset().top);
        console.log(arr)
      }

      // Run this on scroll events.
      //scroll()
      //当用户滚动指定的元素时，会发生scroll事件。
      //scroll事件适用于所有可滚动的元素和window对象（浏览器窗口）
      //scroll()方法触发scroll事件，或规定当发生scroll事件时运行的函数
      $window.scroll(function () {
        console.log(12312312);
        //scrollTop()方法返回或设置匹配元素的滚动条的垂直位置
        var window_top =  $('#container').scrollTop;
        //javascript用offsetTop();jquery用offset().top;
        var div_top = $mainMenuBarAnchor.offset().top;
        arr.forEach(function (val, key) {
          if (window_top > (val - 60)) {
            // Make the div sticky.
            console.log($($mainMenuBar[0]).offset().top);
            $($mainMenuBar[key]).addClass('stick');
            $mainMenuBarAnchor.height($mainMenuBar.height());
          }
          else {
            // Unstick the div.
            $($mainMenuBar[key]).removeClass('stick');
            $mainMenuBarAnchor.height(0);
          }
        })
      });
    });*/


  }
  ngOnInit() {
    //没找到ionic里的滚动事件
    let scroll = document.getElementsByClassName("scroll-content")[0];
    let contentTop= scroll.getBoundingClientRect();
    let dateTop = document.getElementsByClassName("date")[0].getBoundingClientRect();

    scroll.addEventListener("scroll",(e)=>{
      console.log(contentTop);
      console.log(dateTop);
      console.log(scroll.scrollTop);
    })

  }

  //下拉刷新
  doRefresh(refresher) {
    refresher != undefined ? refresher.complete() : '';
    this.getMenu();
    this.getSecMenu();
  }

  //获取开始跟结束时间
  getStarEnd(snu?) {
    let payload = {
      start_time: null,
      end_time: null
    };
    var timer = new Date(snu).setHours(0, 0, 0, 0);
    payload.start_time = new Date(timer).getTime();
    //timer = new Date().setHours(23, 59, 59, 0);
    //payload.end_time = new Date(timer).getTime();
    return payload;
  }

  //获取本周一到本周日\
  getMonSun() {
    var now = new Date(new Date().setHours(23, 59, 59, 0));
    //获取当前日期
    var nowDate = now.getUTCDate();
    var nowTime = now.getTime();
    var day = now.getDay();
    var Mod = new Date(nowTime - (day - 1) * 86400000);
    var Ted = new Date(nowTime - (day - 2) * 86400000);
    var Wed = new Date(nowTime - (day - 3) * 86400000);
    var Tud = new Date(nowTime + (4 - day) * 86400000);
    var Fid = new Date(nowTime + (5 - day) * 86400000);
    var Sad = new Date(nowTime + (6 - day) * 86400000);
    var Sud = new Date(nowTime + (7 - day) * 86400000);
    let payload = [
      {
        timer: Mod.getTime(),
        day: Mod.getUTCDate(),
        name: Mod.getTime() == nowTime ? '今日' : '周一'
      },
      {
        timer: Ted.getTime(),
        day: Ted.getUTCDate(),
        name: Ted.getTime() == nowTime ? '今日' : '周二'
      },
      {
        timer: Wed.getTime(),
        day: Wed.getUTCDate(),
        name: Wed.getTime() == nowTime ? '今日' : '周三'
      },
      {
        timer: Tud.getTime(),
        day: Tud.getUTCDate(),
        name: Tud.getTime() == nowTime ? '今日' : '周四'
      },
      {
        timer: Fid.getTime(),
        day: Fid.getUTCDate(),
        name: Fid.getTime() == nowTime ? '今日' : '周五'
      },
      {
        timer: Sad.getTime(),
        day: Sad.getUTCDate(),
        name: Sad.getTime() == nowTime ? '今日' : '周六'
      },
      {
        timer: Sud.getTime(),
        day: Sud.getUTCDate(),
        name: Sud.getTime() == nowTime ? '今日' : '周日'
      },
    ];
    $scope.MonSun = payload;
    $scope.sun = $scope.MonSun[0];
    //console.log($scope.sun);
    //今天日期
    $scope.today = nowTime;
    $scope.day_active = nowDate;
  }

  //获取一级菜单数据
  getMenu() {
    this.goP.yikeData('classify/main_classify').then(data => {
      let menu = data.json();
      $scope.oneMenu = menu.data;
      //console.log($scope.oneMenu);
      $scope.states = $scope.oneMenu[0].id;
    }).catch(err => {
      this.goP.presentToast(err);
    })
  }

  //下拉选项框下拉事件
  setInfo() {
    $scope.info = $scope.states;
    //console.log($scope.info);
  }


  //获取二级菜单同时获取直播列表
  getSecMenu() {
    let payload = {
      parent_id: $scope.id || 7
    };
    this.goP.yikeData('classify/classify', payload).then(data => {
      //console.log(data);
      let menu = data.json();
      console.log(menu);
      $scope.SecMenu = menu.data;
      //console.log($scope.SecMenu);
      $scope.idmuen = 1;
      //获取默认列表
      let sat = this.getStarEnd($scope.today).start_time / 1000;
      let payload = {
        start_time: sat,
        end_time: $scope.today / 1000,
        classify_id: $scope.idmuen
      };
      console.log(payload);
      this.goP.yikeGet('match/index', payload).then(data => {
        let menu = data.json();
        console.log(menu);
        $scope.classiFied = menu.data;
        console.log($scope.classiFied);

      }).catch(err => {
        this.goP.presentToast(err);
      })

    }).catch(err => {
      this.goP.presentToast(err);
    })
  }

  //点击二级菜单取直播列表
  getData(id) {
    $scope.idmuen = id;
    var now = new Date(new Date().setHours(23, 59, 59, 0));
    //获取当前日期
    var nowDates = now.getUTCDate();
    $scope.day_active = nowDates;
    let sat = this.getStarEnd($scope.today).start_time / 1000;
    let payload = {
      start_time: sat,
      end_time: $scope.today / 1000,
      classify_id: id
    };
    console.log(payload);
    this.goP.yikeGet('match/index', payload).then(data => {
      let menu = data.json();
      console.log(menu);
      $scope.classiFied = menu.data;
      console.log($scope.classiFied);

    }).catch(err => {
      this.goP.presentToast(err);
    })

  }

  //获取比赛列表
  getGameList(snu) {
    //console.log(snu);
    $scope.day_active = snu.day;
    let sat = this.getStarEnd(snu.timer).start_time / 1000;
    let payload = {
      start_time: sat,
      end_time: snu.timer / 1000,
      classify_id: $scope.idmuen
    };
    console.log(payload);
    this.goP.yikeGet('match/index', payload).then(data => {
      let menu = data.json();
      $scope.classiFied = menu.data;
      //console.log($scope.classiFied);
    }).catch(err => {
      this.goP.presentToast(err);
    })
  }

  //跳转详情
  goDetail(id?) {
    this.navCtrl.push(LiveDetailPage, {item: id});
  }

  //关闭广告资源
  CloseAd() {
    $scope.adStatus = 1;
  }


  //回到顶部
  goBack(){
    $scope.deg += 180;
    console.log($scope.deg);
    document.getElementById("img").style.transform = "rotate(" + $scope.deg + "deg)";
  }
}
