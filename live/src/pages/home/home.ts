import { Component, ViewChild,Pipe, PipeTransform,NgZone  } from '@angular/core';
import { NavController, Slides, NavParams } from 'ionic-angular';
import { LiveDetailPage } from './live-detail/live-detail';
import { RepeatProvider } from '../../providers/repeat/repeat';
import * as $ from "jquery";
declare let $:any;
let me;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  host:{
    "(window:scroll)":"onWindowScroll($event)"
  }
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;
  //初始化变量
  mess = {
    type:"7",
    firstId:"",
    firstList:[],
    secList:[],
    startTime:"",
    endTime:"",
    teamList:{},
    idMenu:0,
    deg:0,
    adStatus:1,
    refresh:{
      startTime:"",
      endTime:""
    },
    infinite:{
      startTime:"",
      endTime:""
    }
  };
  fixText = "";
  bannerList = [];

  constructor(private goP:RepeatProvider, public navCtrl:NavController, public navParams: NavParams,private zone: NgZone ) {
    //保存this 这里面执行的很快
    me = this;

  }
//  初始化数据
  ngOnInit(){
    //获取banner图
    me._getBanners();
    //初始化一级菜单
    me._getFirstGameList();
    //初始化二级菜单
    me._getSecMenu();
    //获取今天到后七天的毫秒数
    me._getStartToEnd();

  }

//  获取当天0点到后七天0点的毫秒数
  _getStartToEnd(){
    let nowEnd = new Date(new Date().setHours(0, 0, 0, 0));
    let sevenTime = 24*60*60*7*1000;
    me.mess.startTime = nowEnd.getTime();
    me.mess.refresh.startTime = me.mess.startTime;
    me.mess.endTime = Number(nowEnd.getTime()) + sevenTime;
    me.mess.infinite.endTime = me.mess.endTime;
  }
//  对于获取前七天或者后七天的时间进行赛选分类
  //让对象也能用 ngFor
  getKeys(obj){
    return Object.keys(obj);
  }
  //n代表说是向后还是向前
  _getAfterSeven(now,arr,n){
    let nowSeconds = now;
    let oneDay = 24*60*60; //秒数
    let obj = {};
    let tempTime = (new Date(new Date(nowSeconds*1000).toLocaleDateString()).getTime())/1000;
    obj[tempTime+n*oneDay] = [];
    obj[tempTime+n*2*oneDay] = [];
    obj[tempTime+n*3*oneDay] = [];
    obj[tempTime+n*4*oneDay] = [];
    obj[tempTime+n*5*oneDay] = [];
    obj[tempTime+n*6*oneDay] = [];
    if(n == 1){
      obj[tempTime]=[];
    }
    if(n == -1){
      obj[tempTime+n*7*oneDay] = [];
    }

    for(let i=0;i<arr.length;i++){
      let time = (new Date(new Date(arr[i].time*1000).toLocaleDateString()).getTime())/1000;
      obj[time].push(arr[i]);
    }
    return obj;
  }
//  获取banner图
  _getBanners(){
    let payload = {
      type: 1
    };
    this.goP.yikeGet('ad/index',payload).then(data => {
      let ad = data.json();
      //直播广告
      me.bannerList = ad.data;
      me.bannerLength = me.bannerList.length;
    }).catch(err => {
      this.goP.presentToast(err);
    })
  }
//  获取不同联赛
  getDiffGameList(idMenu){
    me.mess.idMenu = idMenu;
    me._getStartToEnd();
    let payload = {
      start_time: me.mess.startTime/1000,
      end_time: me.mess.endTime / 1000,
      classify_id: me.mess.idMenu
    };
    me.mess.teamList = {};
    me._getTeamList(payload,1)
  }
//  一级菜单发生变化
  firstMenuChange(e){
    me.mess.type = e;
    me._getSecMenu();
  }
//  获取一级类型
  _getFirstGameList(){
    me.goP.yikeData('classify/main_classify')
      .then(data=>{
        let type = data.json();
        me.mess.firstList = type.data;
      }).catch(err=>{
      me.goP.presentToast(err);
    });
  }
//对于固定日期的方法
  _fixedDate(){
    me.scroll = document.getElementsByClassName("scroll-content")[0]; 

    setTimeout(()=>{
      me.dateList = $(".date");
      me.dateTopObj = {};
      for(let i=0;i<me.dateList.length;i++){
        me.dateTopObj[i] = {
          offsetTop:me.dateList[i].offsetTop,
          text:me.dateList[i].innerText
        };
      }
      me.scroll.addEventListener("scroll",(e)=>{

        let scrollDistance = me.scroll.scrollTop;
        if((function(scrollDistance){
          for(let key in me.dateTopObj){
            if(Number(key)+1 == me.dateList.length){
              if(scrollDistance > me.dateTopObj[key].offsetTop){
                me.fixText = me.dateTopObj[key].text;
                if($(".fixed").length > 0){
                  $(".fixed")[0].style.top = $("ion-header").css("height");
                }
                return false;
              }
            }
            if(scrollDistance>me.dateTopObj[key].offsetTop && scrollDistance < me.dateTopObj[Number(key)+1].offsetTop){
              me.fixText = me.dateTopObj[key].text;
              if($(".fixed").length > 0){
                $(".fixed")[0].style.top = $("ion-header").css("height");
              }
              return false;
            }
          }
            return true;
        })(scrollDistance)){
           me.fixText = "";
        }
      })
    },500);
  }
//获取二级菜单
  _getSecMenu() {
    let payload = {
      parent_id: me.mess.type
    };
    me.goP.yikeData('classify/classify', payload).then(data => {
      let menu = data.json();
      me.mess.secList = menu.data;
      let payload = {
        start_time: me.mess.startTime/1000,
        end_time: me.mess.endTime / 1000,
        classify_id: me.mess.idMenu
      };
      me._getTeamList(payload,1)
    }).catch(err => {
      me.goP.presentToast(err);
    })
  }
//  获取某段时间内的所有对应id下的球队列表
  _getTeamList(payload,n,refresh){
    me.goP.yikeGet('match/index', payload).then(data => {
      let list = data.json();
      if(list.data.length > 0){
        for(let i = 0;i<list.data.length;i++){
          list.data[i].beginTiem = new Date(list.data[i].time*1000).getHours()+":"+new Date(list.data[i].time*1000).getMinutes();
        }
      }
      if(Object.keys(me.mess.teamList).length == 0){
        me.mess.teamList = me._getAfterSeven(payload.start_time,list.data,n);
      }else{
        // 合并对象
        if(n == -1){
          Object.assign(me.mess.teamList,me._getAfterSeven(payload.end_time,list.data,n));
        }
        if(n == 1){
          Object.assign(me.mess.teamList,me._getAfterSeven(payload.start_time,list.data,n));
        }
      }
      if(refresh){
        refresh.complete();
      }
      me._fixedDate();
    }).catch(err => {
      this.goP.presentToast(err);
    })
  }
//时间格式化 形如 2014年10月2日 星期二
  _formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n
  }
  formatTime(number) {

    let year ,month,day,dateN;

    let date = new Date(number * 1000);
    year = date.getFullYear();
    month = me._formatNumber(date.getMonth() + 1);
    day = me._formatNumber(date.getDate());

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
  //下拉刷新
  doRefresh(refresh){
    let tempTime = me.mess.refresh.startTime;
    let sevenTime = 24*60*60*7*1000;
    me.mess.refresh.startTime = tempTime - sevenTime;
    me.mess.refresh.endTime = tempTime;

    let payload = {
      start_time: me.mess.refresh.startTime/1000,
      end_time: me.mess.refresh.endTime / 1000,
      classify_id: me.mess.idMenu
    };
    me._getTeamList(payload,-1,refresh);
  }
  //上拉加载
  doInfinite(infinite){
    let tempTime = me.mess.infinite.endTime;
    let sevenTime = 24*60*60*7*1000;
    me.mess.infinite.startTime = tempTime;
    me.mess.infinite.endTime = tempTime + sevenTime;

    let payload = {
      start_time: me.mess.infinite.startTime/1000,
      end_time: me.mess.infinite.endTime / 1000,
      classify_id: me.mess.idMenu
    };
    me._getTeamList(payload,1,infinite);
  }
  //回到顶部
  goBack(){
    me.mess.deg += 180;
    document.getElementById("img").style.transform = "rotate(" + me.mess.deg + "deg)";
    me.scroll.scrollTop = 0;
  }
  //关闭广告资源
  CloseAd() {
    me.mess.adStatus = 0;
  }
//  进入直播
  goLive(id){
    me.navCtrl.push(LiveDetailPage, {item: id});
  }
}
