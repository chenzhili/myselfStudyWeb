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
    this.getStarEnd();


  }
  ionViewDidEnter() {
    this._fixedDate();

  }
  //对于固定日期的方法
  _fixedDate(){
    let scroll = document.getElementsByClassName("scroll-content")[0];
    let dateList = $(".date");
    let dateTopObj = {};
    for(let i=0;i<dateList.length;i++){
      dateTopObj[i] = dateList[i].offsetTop;
    }
    scroll.addEventListener("scroll",(e)=>{
      let scrollDistance = scroll.scrollTop;
      for(let key in dateTopObj){
        if(key == dateList.length){
          if(scrollDistance > dateTopObj[key]){
            dateList[key].className = "date date_fix";
          }else{
            dateList[key].className = "date";
          }
        }
        if(scrollDistance>dateTopObj[key] && scrollDistance < dateTopObj [Number(key)+1]){
          dateList[key].className = "date date_fix";
          dateList[key].style.top = scrollDistance-dateTopObj[key]+"px";
        }else{
          dateList[key].className = "date";
          dateList[key].style.top = 0;
        }
      }
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
  //时间格式化 形如 2014年10月2日 星期二
  _formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n
  }
  _formatTime(number) {

    let year ,month,day,dateN;

    let date = new Date(number * 1000);
    year = date.getFullYear();
    month = this._formatNumber(date.getMonth() + 1);
    day = this._formatNumber(date.getDate());

    dateN = date.getDay();
    switch(dateN){
      case 0:dateN = "日";break;
      case 1:dateN = "一";break;
      case 2:dateN = "二";break;
      case 3:dateN = "三";break;
      case 4:dateN = "四";break;
      case 5:dateN = "五";break;
      case 6:dateN = "六";break;
    }
    return `${year}年${month}月${day}日 星期${dateN}`;
  }
  //获取一级菜单数据
  getMenu() {
    this.goP.yikeData('classify/main_classify').then(data => {
      let menu = data.json();
      $scope.oneMenu = menu.data;
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
      $scope.idmuen = 0;
      //获取默认列表
      let sat = this.getStarEnd($scope.today).start_time / 1000;
      let payload = {
        start_time: sat,
        end_time: $scope.today / 1000,
        classify_id: $scope.idmuen
      };
      this.getSecGameList(payload);
    }).catch(err => {
      this.goP.presentToast(err);
    })
  }
  //获取二级菜单的比赛列表
  getSecGameList(payload){
    this.goP.yikeGet('match/index', payload).then(data => {
      let menu = data.json();
      for(let i = 0;i<menu.data.length;i++){
        menu.data[i].dateTime = this._formatTime(menu.data[i].time);
        menu.data[i].beginTiem = new Date(menu.data[i].time*1000).getHours()+":"+new Date(menu.data[i].time*1000).getMinutes();
      }
      $scope.classiFied = menu.data;
    }).catch(err => {
      this.goP.presentToast(err);
    })
  }
  //点击二级菜单取直播列表
  getData(id) {
    $scope.idmuen = id;
    let now = new Date(new Date().setHours(23, 59, 59, 0));
    //获取当前日期
    let nowDates = now.getUTCDate();
    $scope.day_active = nowDates;
    let sat = this.getStarEnd($scope.today).start_time / 1000;
    let payload = {
      start_time: sat,
      end_time: $scope.today / 1000,
      classify_id: id
    };
    this.getSecGameList(payload);
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
